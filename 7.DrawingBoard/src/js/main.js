class DrawingBoard {
  // NONE, BRUSH, ERASER
  MODE = 'NONE';

  IsMouseDown = false;

  backgroundColor = '#fff';

  eraserColor = '#fff';

  IsNavigatorVisible;

  imgHistoryArr = [];

  constructor() {
    this.assginElement();
    this.initContext();
    this.initCanvasBgColor();
    this.addEvent();
  }

  assginElement() {
    this.containerEl = document.getElementById('container');
    this.canvasEl = this.containerEl.querySelector('#canvas');
    this.toolbarEl = this.containerEl.querySelector('#toolbar');
    this.brushEl = this.toolbarEl.querySelector('#brush');
    this.colorPickerEl = this.toolbarEl.querySelector('#colorPicker');
    this.brushPanelEl = this.containerEl.querySelector('#brushPanel');
    this.brushSizeInputEl = this.brushPanelEl.querySelector('#brushSize');
    this.brushSizePreviewEl =
      this.brushPanelEl.querySelector('#brushSizePreview');
    this.eraserEl = this.toolbarEl.querySelector('#eraser');
    this.navigatorEl = this.toolbarEl.querySelector('#navigator');
    this.navigatorPreviewWrapperEl = this.containerEl.querySelector('#imgNav');
    this.navigatorPreviewImgEl =
      this.navigatorPreviewWrapperEl.querySelector('#canvasImg');
    this.undoEl = this.toolbarEl.querySelector('#undo');
  }

  initContext() {
    this.context = this.canvasEl.getContext('2d');
  }

  // 하얀색 배경을 가지는 직사각형을 그려줌
  initCanvasBgColor() {
    this.context.fillStyle = this.backgroundColor;
    this.context.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height);
  }

  addEvent() {
    this.brushEl.addEventListener('click', this.onClickBrush);
    this.canvasEl.addEventListener('mousedown', this.onMouseDown);
    this.canvasEl.addEventListener('mousemove', this.onMouseMove);
    this.canvasEl.addEventListener('mouseup', this.onMouseUp);
    this.canvasEl.addEventListener('mouseout', this.onMouseOut);
    this.brushSizeInputEl.addEventListener('input', this.onChangeBrushSize);
    this.colorPickerEl.addEventListener('input', this.onChangeColor);
    this.eraserEl.addEventListener('click', this.onClickEraser);
    this.navigatorEl.addEventListener('click', this.onCLickNavigator);
    this.undoEl.addEventListener('click', this.onCLickUndo);
  }

  onClickBrush = event => {
    const isActive = event.currentTarget.classList.contains('active');
    this.MODE = isActive ? 'NONE' : 'BRUSH';
    this.brushPanelEl.classList.toggle('hide', isActive);
    // 캔버스의 커서만을 스타일링
    this.canvasEl.style.cursor = isActive ? 'default' : 'crosshair';
    event.currentTarget.classList.toggle('active');
    this.eraserEl.classList.remove('active');
  };

  onMouseDown = event => {
    if (this.MODE === 'NONE') return;
    this.IsMouseDown = true;
    const currentPosition = this.getMousePosition(event);
    this.context.beginPath();
    this.context.moveTo(currentPosition.x, currentPosition.y);
    this.context.lineCap = 'round';
    if (this.MODE === 'BRUSH') {
      this.context.strokeStyle = this.colorPickerEl.value;
      this.context.lineWidth = this.brushSizeInputEl.value;
    } else if (this.MODE === 'ERASER') {
      this.context.strokeStyle = this.eraserColor;
      this.context.lineWidth = 50;
    }
    this.saveHistory();
  };

  onMouseMove = event => {
    if (!this.IsMouseDown) return;
    const currentPosition = this.getMousePosition(event);
    this.context.lineTo(currentPosition.x, currentPosition.y);
    this.context.stroke();
  };

  onMouseUp = () => {
    if (this.MODE === 'NONE') return;
    this.IsMouseDown = false;
    this.updateNavigator();
  };

  onMouseOut = () => {
    if (this.MODE === 'NONE') return;
    this.IsMouseDown = false;
    this.updateNavigator();
  };

  getMousePosition = event => {
    const boundaries = this.canvasEl.getBoundingClientRect();
    return {
      x: event.clientX - boundaries.left,
      y: event.clientY - boundaries.top,
    };
  };

  onChangeBrushSize = event => {
    this.brushSizePreviewEl.style.width = `${event.target.value}px`;
    this.brushSizePreviewEl.style.height = `${event.target.value}px`;
  };

  onChangeColor = event => {
    this.brushSizePreviewEl.style.backgroundColor = event.target.value;
  };

  onClickEraser = event => {
    const isActive = event.currentTarget.classList.contains('active');
    this.MODE = isActive ? 'NONE' : 'ERASER';
    this.canvasEl.style.cursor = isActive ? 'default' : 'crosshair';
    this.brushPanelEl.classList.add('hide');
    event.currentTarget.classList.toggle('active');
    this.brushEl.classList.remove('active');
  };

  onCLickNavigator = event => {
    this.IsNavigatorVisible = !event.currentTarget.classList.contains('active');
    event.currentTarget.classList.toggle('active');
    this.navigatorPreviewWrapperEl.classList.toggle('hide');
    this.updateNavigator();
  };

  updateNavigator() {
    if (this.IsNavigatorVisible) return;
    // 캔버스의 사진 정보를 URL로 변환 this.canvasEl.toDataURL()
    this.navigatorPreviewImgEl.src = this.canvasEl.toDataURL();
  }

  onCLickUndo = () => {
    if (this.imgHistoryArr.length === 0) {
      // eslint-disable-next-line no-alert
      alert('더이상 되돌릴 수 없어 그러니 소중히 했어야지');
      return;
    }
    const previousDataUrl = this.imgHistoryArr.pop();
    const previousImg = new Image();
    previousImg.onload = () => {
      this.context.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
      this.context.drawImage(
        previousImg,
        0,
        0,
        this.canvasEl.width,
        this.canvasEl.height,
        0,
        0,
        this.canvasEl.width,
        this.canvasEl.height,
      );
    };
    previousImg.src = previousDataUrl;
  };

  saveHistory() {
    // 기록을 최대 5개만 저장함
    if (this.imgHistoryArr.length > 4) this.imgHistoryArr.shift();
    this.imgHistoryArr.push(this.canvasEl.toDataURL());
  }
}

const drawingBoard = new DrawingBoard();
