import $ from 'jquery';
import * as React from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import { isMobileView } from '../../util/isMobileView';

// pdf worker 지정
pdfjs.GlobalWorkerOptions.workerSrc = `pdf.worker.js`;



interface Props {
  documentUrl: string;
  scale: number;
  onPageChange: (pageNumber: number) => void;
  setScale: (scale: number) => void;
  pageNumber: number;
}

export default class PdfViewer extends React.Component<Props, React.ComponentState> {

  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1,
    };

    this.getNewPdfItem = this.getNewPdfItem.bind(this);
  }

  scrollTo = -1;

  pageRendering = false;

  componentDidMount() {
    $('.editor-view').on('mousewheel', this.handleMouseWheel);
  }

  componentWillUnmount() {
    $('.editor-view').off('mousewheel', this.handleMouseWheel);
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.pageNumber !== prevState.pageNumber) {
      return {pageNumber: nextProps.pageNumber};
    }
    return null;
  }

  handleMouseWheel = e => {
    if(isMobileView()) {
      return;
    }
    // console.log($('.editor-view').scrollTop()
    //           , $('.editor-view').height()
    //           , $('.editor-view').scrollTop() + $('.editor-view').height()
    //           , $('.document-wrapper').height())
    if(this.pageRendering) {
      console.log('page still rendering!')
      e.preventDefault();
      return false;
    }
    if( this.thumbnail.contains(e.target) ) {
      console.log('scroll on thumbnail!')
      return;
    }

    if(e.originalEvent.wheelDelta /120 > 0) {
        // console.log('scrolling up !');
        if($('.editor-view').scrollTop() == 0) {
          console.log('Document.tsx top boom!')
          let {pageNumber} = this.state;
          pageNumber--;
          if(pageNumber >= 1) {
            console.log('setting page ', pageNumber)
            e.preventDefault()
            this.moveTo(pageNumber, $('.document-wrapper').height());
          }
        }
    }
    else{
        // console.log('scrolling down !');
        if($('.editor-view').scrollTop() + $('.editor-view').height() > $('.document-wrapper').height()) {
          console.log('Document.tsx bottom boom!')
          let {pageNumber, numPages} = this.state;
          pageNumber++;
          if(pageNumber <= numPages) {
            console.log('setting page ', pageNumber)
            e.preventDefault();
            this.moveTo(pageNumber, 0);
          }
        }
    }
  };


  componentDidUpdate(_, prevState): void {
    
  }

  private getNewPdfItem(e: React.MouseEvent) {
    e.preventDefault();
    const pageNumber = Number(e.currentTarget.getAttribute('data-index')) + 1;
    // this.pageRendering = true;
    // this.props.onPageChange(pageNumber);
    this.moveTo(pageNumber, -1);
  }


  onDocumentLoadSuccess = (document) => {
    console.log('DocumentLoadSuccess', document)
    this.setState({
      numPages: document.numPages
    });
  };

  onPageLoadSuccess = (page) => {
    console.log('PageLoadSuccess')
    
    // 페이지 최초로드후 scale 계산함
    if(this.props.scale === undefined) {
      const width = $('.editor-view').width();
      const scale = width / page.originalWidth / 1.1;
      this.props.setScale(scale);
    }
    
    // 페이지 로드후 scrollTo 값이 설정되어있는 경우 해당위치로 스크롤함
    if(this.scrollTo !== -1) {
      document.querySelector('.editor-view').scrollTop = this.scrollTo;
      this.scrollTo = -1;
    }
  }

  thumbnail = null; // 썸네일 DOM
  curThumbnail = null; // 현재 페이지의 썸네일 DOM

  onPageRenderSuccess = (page) => {
    console.log('PageRenderSuccess', page)
    this.pageRendering = false;
    
    // 현재 페이지의 썸네일이 화면 밖에 있는경우 현재 페이지의 썸네일이 보이도록 썸네일부분을 스크롤함
    // (pc버전 : 세로스크롤, 모바일버전 : 가로스크롤)
    if( !this.isElementInViewport(this.curThumbnail) ) {
      console.log('ThumbnailNotInViewport!')

      if(!isMobileView()) {
        let scrollTo = this.curThumbnail.offsetTop;
        let padding = Number($(this.thumbnail).css('padding-top').replace('px', '') - 1);
        scrollTo -= padding;
        // this.thumbnail.scrollTo(0, scrollTo)
        this.thumbnail.scrollTop = scrollTo;
      }
      else {
        let scrollTo = this.curThumbnail.offsetLeft;
        let padding = 10;
        scrollTo -= padding;
        this.thumbnail.scrollLeft = scrollTo;
      }
    }

    
  }

  onThumbnailRenderSuccess = () => {
    $('.thumbnail canvas').css('width', '').css('height', '').css('display', '');
  }

  isElementInViewport = (el) => {
    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
  }

  moveTo = (page: number, scroll: number) => {
    if(this.state.pageNumber !== page) {
      this.scrollTo = scroll;
      this.pageRendering = true;
      this.props.onPageChange(page);
    }
    else {
      document.querySelector('.editor-view').scrollTop = scroll;
    }
  }
  

  public render(): JSX.Element {

    const {
      pageNumber,
      numPages,
    } = this.state;

    const { scale } = this.props;
    console.log('scale = ', scale)

    return (
          <React.Fragment>
            <div className="thumbnail" ref={ref => this.thumbnail = ref}>
              
                      <Document
                        className='thumbnail-document-wrapper'
                        file={this.props.documentUrl}
                      >
                        <ul>
                        {Array.from(
                          new Array(numPages),
                          (el, index) => (
                            <li 
                              key={index}
                              className={pageNumber === index+1  ? 'on' : undefined}
                              ref={ref => {if(pageNumber === index+1) this.curThumbnail = ref} }
                            >
                              <a data-index={index} onClick={this.getNewPdfItem}>
                                <Page
                                  className='thumbnail-page-wrapper'
                                  key={`page_${index + 1}`}
                                  pageNumber={index + 1}
                                  renderMode='canvas'
                                  renderTextLayer={false}
                                  renderAnnotationLayer={false}
                                  // onLoadSuccess={page => console.log(`thumbnail page-${page.pageNumber} loaded`)}
                                  onRenderSuccess={this.onThumbnailRenderSuccess}
                                  // scale={0.22}
                                  width={130}
                                >
                                  <span className="thumbnail-label">{index + 1}</span>
                                </Page>
                              </a>
                            </li>
                          ),
                        )}
                        </ul>
                      </Document>
            </div>
            <div className="editor-view">
              <Document
                className='document-wrapper'
                file={this.props.documentUrl}
                onLoadSuccess={this.onDocumentLoadSuccess}
              >
                <Page 
                  className='page-wrapper'
                  pageNumber={pageNumber}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  scale={scale}
                  onLoadSuccess={this.onPageLoadSuccess}
                  onRenderSuccess={this.onPageRenderSuccess}
                >
                  {this.props.children}
                </Page>
              </Document>

            </div>
          </React.Fragment>
    );
  }
}

