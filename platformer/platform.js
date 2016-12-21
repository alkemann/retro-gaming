function Platform(x, y, w, h) {
  return {
    pos: createVector(x, y),
    width: w,
    height: h,
    render: function() {
      push();
      stroke(230);
      noFill();
      rect(this.pos.x, this.pos.y, this.width, this.height);
      pop();
    }
  }
}
