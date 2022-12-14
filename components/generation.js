class Generation {
  // Makes a population of designs
  // The number of designs is nDesigns

  constructor(nDesigns = 3) {
    this.nDesigns = 4
    this.designs = []
    this.selectedDesigns = []
    this.droppedSeeds = []
    this.newGenerationDesigns = []
  } 


  init() {
  // init is called at the beginning and when the new generation button is pressed
   this.homePos = []

  // Set the equally-spaced home positions of the designs 
  let sep = width / (this.nDesigns * 2)
    for(let i = 0; i < this.nDesigns; i++) {
      let xpos = sep * (((i+1)*2)-1)
      this.homePos[i] = (xpos)
    } 

  // Set the actual position of each design
  // (a random value near the equally spaced position)
  // Define each design
    for(let i = 0; i < this.nDesigns; i++) {
      let xpos = this.homePos[i] + random(-30,30)
      let ypos = height-100 + random(-30,30)

      let newDesign = new Design(xpos, ypos)
      this.designs.push(newDesign)
    }
  }


  make() {
    // Directs the making of each design
    this.designs.forEach(design => design.make())

    // // Directs the dropping of all seeds of selected designs NOT USED
    // for(let i = 0; i < this.designs.length; i++) {
    //   let d = this.designs[i]
    //   // console.log("d", d.selected)
    //   if (d.selected == true) {
    //     d.dropSeeds()
    //   }
    // }
  }

  draw() {
    this.designs.forEach(design => design.draw())
  }
  

  newGeneration() {
    // filter puts all designs from the this.designs array that are selected into the selectedDesigns array
    let selectedDesigns = this.designs.filter(design => design.selected === true)

    // select all designs if no design is selected 
    if(selectedDesigns.length == 0) selectedDesigns = this.designs
    // console.log ("Selected in gen", selectedDesigns.length )

    // For each design in the selectedDesigns array, all its seeds are put in the dropped seeds array
    selectedDesigns.forEach(design => {
      let seeds = design.seeds.filter(seeds => seeds instanceof Seed)
      // this.droppedSeeds.push(seeds)
      this.droppedSeeds.push(...seeds)
    })

    // make new Generation
    this.newGenerationDesigns = []

    // Find the seed that dropped closest to homePos
    // just look in the x direction for now - later look in y direction as well
    for(let i = 0; i < this.nDesigns; i++) {
      let xpos = this.homePos[i]
      // console.log ("randx", xpos)
      // the above sets randx for selectedSeed
      let selectedSeed = this.selectSeed(this.droppedSeeds, xpos)
      this.droppedSeeds = this.droppedSeeds.filter(seed => seed.dropPoint.x != selectedSeed.dropPoint.x)
      let oldDesign = selectedSeed.design
      // console.log ("oldDesign", oldDesign)

      let newGenes = this.getGenes(oldDesign)
      
      let newDesign = new Design(selectedSeed.dropPoint.x, height-100, newGenes)


      // let len = this.design.genes.bottomHeight
      // let wid = this.design.genes.bottomWidth

      // let newDesign = new Design(xpos, ypos, len, wid)
      this.newGenerationDesigns.push(newDesign) 
    }
     // reset parameters for new generation
     this.designs = this.newGenerationDesigns
     this.seeds = this.newGenerationDesigns.seeds //???
     this.droppedSeeds = []   
     this.selectedDesigns = []
  }

  // setPositionNewDesign(droppedSeeds, newDesign) {
  //   // This is NOT being used instead of the above ????
  //   droppedSeeds.sort((a, b) => {
  //     let dist = Math.abs(a.dropPoint.x - newDesign.pos.x) - Math.abs(b.dropPoint.x - newDesign.pos.x)
  //     return dist
  //   })
  //   let seed = droppedSeeds[0]
  //   let design = seed.design
  //   newDesign.pos = createVector(seed.dropPoint.x, height)
  //   this.setGenes(design, newDesign)
  // }


  selectSeed(droppedSeeds, randx) {
    droppedSeeds.sort((a, b) => {
      let dist = Math.abs(a.dropPoint.x - randx) - Math.abs(b.dropPoint.x - randx)
      return dist
    })
    let seed = droppedSeeds[0]
    return seed
  }


  getGenes(oldDesign) { 
    // Make new genes for the new design
    // Note that the genes in the new design will not be exactly the same as the genes of the parent design - random values nearby are found

     // Find new designHeight genes
     let newdesignHeight = oldDesign.genes.designHeight + floor(random(-20, 20))

     if (newdesignHeight < 180) { 
       newdesignHeight = 180
     }

    // Find new bottomHeight genes
    let newbottomHeight = oldDesign.genes.bottomHeight + floor(random(-30, 30))
    if (newbottomHeight < 80) { 
      newbottomHeight = 80
    }

    // Find new bottomWidth genes
    let newbottomWidth = oldDesign.genes.bottomWidth + floor(random(-30, 30))
      if (newbottomWidth < 60) { 
        newbottomWidth = 60
      }

       // Find new topHeight genes
    let newtopHeight = oldDesign.genes.topHeight + floor(random(-30, 30))
    if (newtopHeight < 80) { 
      newtopHeight = 80
    }

    // Find new topWidth genes
    let newtopWidth = oldDesign.genes.topWidth + floor(random(-30, 30))
      if (newtopHeight < 60) { 
        newtopHeight = 60
      }

    // Find new connectHeight genes
    let newconnectHeight = oldDesign.genes.connectHeight + floor(random(-20, 20))
    if (newconnectHeight < 20) { 
      newconnectHeight = 20
    }

  // Make new number of seeds in each design
  // let newSeeds = oldDesign.genes.numSeeds + floor(random(-1.3, 1.3))
  // if (newSeeds < 20) newSeeds = 20
  // if (newSeeds > 80) newSeeds = 80

  let newGenes = {
    designHeight: abs(newdesignHeight),
    bottomHeight: abs(newbottomHeight),
    bottomWidth: abs(newbottomWidth),
    topHeight: abs(newtopHeight),
    topWidth: abs(newtopWidth),
    connectHeight: abs(newconnectHeight)
  }
  
  return newGenes
  }
}