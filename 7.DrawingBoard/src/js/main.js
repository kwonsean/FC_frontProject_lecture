class DrawingBoard {
  // NONE, BRUSH, ERASER
  MODE = 'NONE';

  IsMouseDown = false;

  constructor() {
    this.assginElement();
    this.initContext();
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
  }

  initContext() {
    this.context = this.canvasEl.getContext('2d');
  }

  addEvent() {
    this.brushEl.addEventListener('click', this.onClickBrush);
    this.canvasEl.addEventListener('mousedown', this.onMouseDown);
    this.canvasEl.addEventListener('mousemove', this.onMouseMove);
    this.canvasEl.addEventListener('mouseup', this.onMouseUp);
    this.canvasEl.addEventListener('mouseout', this.onMouseOut);
    this.brushSizeInputEl.addEventListener('input', this.onChangeBrushSize);
    this.colorPickerEl.addEventListener('input', this.onChangeColor);
  }

  onClickBrush = event => {
    const isActive = event.currentTarget.classList.contains('active');
    this.MODE = isActive ? 'NONE' : 'BRUSH';
    this.brushPanelEl.classList.toggle('hide', isActive);
    // 캔버스의 커서만을 스타일링
    this.canvasEl.style.cursor = isActive ? 'default' : 'crosshair';
    this.brushEl.classList.toggle('active');
  };

  onMouseDown = event => {
    if (this.MODE === 'NONE') return;
    this.IsMouseDown = true;
    const currentPosition = this.getMousePosition(event);
    this.context.beginPath();
    this.context.moveTo(currentPosition.x, currentPosition.y);
    this.context.lineCap = 'round';
    this.context.strokeStyle = this.colorPickerEl.value;
    this.context.lineWidth = this.brushSizeInputEl.value;
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
  };

  onMouseOut = () => {
    if (this.MODE === 'NONE') return;
    this.IsMouseDown = false;
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
}

const drawingBoard = new DrawingBoard();
