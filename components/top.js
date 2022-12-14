class Top {
  // Draws a top

  constructor(x, y, design) {
    // The position of the top is pos
    this.pos = createVector(x, y) 
    this.design = design

    // The top colour
    this.topR = 120
    this.topG = 10
    this.topB = 120
  }


  draw() {
    // Draw the top

    fill(this.topR, this.topG, this.topB)
    noStroke()
    // circle(this.pos.x, this.pos.y, 8)
    // Draw the design
    stroke(190,160, 230)
    noStroke()

    let len = this.design.genes.topHeight
    let wid1 = this.design.genes.topWidth
    let wid2 = wid1 * 1.2
    let x = this.pos.x
    let y = this.pos.y

    push()
      translate (x,y)

      line(0, 0,    0, -len) 
      bezier (0, 0,    -wid1, len-50,    -wid2, -len*1.5,    0, -len*2) 
      bezier (0, 0,    wid1, 40,    wid2, -len-30,    0, -len*2) 

      fill ('blue')
      // Draw the anchor points
      circle(0,0,2)
      circle (-wid1, -40,20)
      circle (-wid2, -len+60, 5)
      circle (wid1, 40,10)
      circle (wid2, -len-60, 7)
    pop ()
  }
}