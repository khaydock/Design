class Design {
  // Makes design
  // Directs the creation of seeds
  // Also draws the red selection circle
 
  constructor(x, y, genes=null) {
    // Create vector for the position of each design
    this.pos = createVector(x, y)
    this.ground = height - 100
    this.selected = false
    this.seeds = []
    this.nSeeds = 10
   
    if(genes != null) {
      this.setGenes(genes)
    } 
    else {
    // Set the initial genes for each design at the start of the simulation 
      let randomGenes = {
        designHeight: random (200,300),
        bottomHeight: (random(200,300)),
        bottomWidth: (random(60,100)),
        topHeight: (random(50,80)),
        topWidth: (random(80,120)),
        connectHeight: (random(80,100))
      }
      this.setGenes(randomGenes)
    }

    this.init()  
  } 
   
  init() {

    // Define the position of the top
    this.topPosy = -this.genes.connectHeight*2//random(-600, -400)
    // Define the top
    this.top = new Top(0, this.topPosy, this)

    // Define the seeds
    for(let i = 0; i < this.nSeeds; i++) {
      // Make the seeds at random positions inside a circle of diameter a little less than whichever is smaller, bottomHeight or bottomWidth
      this.diam = this.genes.bottomHeight*.45
      if (this.genes.bottomWidth*.45 < this.diam) this.diam = this.genes.bottomWidth*.45
   
      let dist = random (0, this.diam)
      let ang = random (0,360)
      let x = dist * cos(ang)
      let y = dist * sin(ang)
      const seed = new Seed(x, y, this)
      this.seeds.push(seed)
      }

      // Define the appendages
      this.appendage = []
  
      // numAp is the number of pairs of appendages  
      this.numAp = 4 
  
      //Find y-positions of each pair of appendages
      this.apPos = [0]
      this.apPosIndex = 1
      let sum = 0
        for(let i = 0; i < this.numAp-1; i++) {
          const r = Math.random(1,2)
          sum += r
          this.apPos.push(sum)
        }
        // Random appendage positions will be mapped to be between the beginning of the connector and 80% to the bottom
        this.apPos = this.apPos.map(value => Math.floor((value / sum) * this.rootLength*.8))
       
      // Define appendages
      for (let i = 0; i < this.apNum; i++) {
        // let dir = floor(random(0,2))
        // if (dir == 0) { dir = -1}
        let dir = 1
        let p = this.apPos[i]
        this.appendage[i] = new Appendage(0,p, dir)
       }
       

      // let ysep = (floor(this.genes.bottomHeight)/this.nSeeds)
      // let y = height-this.genes.bottomHeight + (i*ysep)
      // const seed = new Seed(this.pos.x, y, this)
      // this.seeds.push(seed)
    // }

    // this.bottomHeight = this.genes.bottomHeight
    // this.bottomWidth = this.genes.bottomWidth

  }
        
  draw() {
    
    // Draw a circle to show that the design is selected 
    if(this.selected) {
      stroke('red')
      strokeWeight(3)
      noFill()
      circle(this.pos.x, this.pos.y-this.genes.bottomHeight, 200)  
    }    
       
    // Draw the design
    stroke(190,160, 230)
    fill(210, 140, 190)
    noStroke()

    let len = this.genes.bottomHeight
    let wid1 = this.genes.bottomWidth
    let wid2 = wid1 * .5
    let x = this.pos.x
    let y = this.pos.y

    push()
      translate (x,y)

      line(0, 0,    0, -len) 
      bezier (0, 0,    -wid1, -40,    -wid2, -len+60,    0, -len) 
      bezier (0, 0,    wid1, 40,    wid2, -len-60,    0, -len) 

      fill ('blue')
      // Draw the anchor points
      circle (-wid1, -40,10)
      circle (-wid2, -len+60, 10)
      circle (wid1, 40,10)
      circle (wid2, -len-60, 12)

      // Draw the top
      this.top.draw()

      // Draw the appengages
      for(let i = 0; i < this.numAp; i++) {

      }


       // Draw connector
       fill(180,170,20)
       let midy = this.topPosy - this.genes.connectHeight
       quad (-this.diam,-len/2, this.diam,-len/2, wid1/2,midy, -wid1/2,midy) 

      // Draw the nucleus
      fill (140,90,190)
      noStroke()
      circle(0,midy,this.diam*2.3)

      // Call Seeds to make and draw the seeds
      for (let i = 0; i < this.seeds.length; i++) {
        this.seeds.forEach((seed, i) => {
          // seed.update()
          // seed.make()
          push ()
            translate (0, midy)
            seed.draw()
          pop ()
        })
      }
    pop ()
  }
     
  make() {
    this.currHeight = this.genes.bottomHeight   
        }
 

  select() {
    this.selected = true
    console.log ("Selected")
    return this
  }

  toggleSelect() {
  // If design was already selected, unselect
    this.selected = this.selected === true ? false : true
    return this
  }


  // Dropping seeds after the design is selected
    dropSeeds() {
      if(this.seeds != null) {
        console.log ("NOT NULL")
        let seeds = this.seeds
        seeds.forEach(seed => {
          seed.dropping = true
          if(seed.dropVector != null) return
          console.log ("dropVector null")
          // If no seeds were selected, all seeds are selected
          seed.dropVector = p5.Vector.sub(seed.dropPoint, seed.pos).normalize().mult(10) 
        })
      }
  }


  setGenes(genes) {
    this.genes = genes
    this.initFromGenes()
  }

  initFromGenes() {
    this.bottomHeight = this.genes.bottomHeight
    this.bottomWidth = this.genes.bottomWidth
  }
}