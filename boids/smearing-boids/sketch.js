let flock;

let number_of_boids = 100; // how many boids on the screen?
let min_life_force = 1500;
let max_life_force = 2500;
let life_force_decrement = 0.0; // set to some value; boid will die off a bit by this amt/frame
let number_of_groups = 3; // set from 1 - 6 probably

function setup() {
  createCanvas(windowWidth, windowHeight);
  flock = new Flock();
  // Add an initial set of boids into the system
  for (let i = 0; i < number_of_boids; i++) {
    let b = new Boid(width / 2, height / 2);
    //let b = new Boid(random(width), random(height));
    // let b = new Boid(random(1*width/3, 2*width/3), random(1*height/3, 2*height/3))
    flock.addBoid(b);
  }
}

function draw() {
 background(0, 10);
  //background(255);
  if (flock.boids.length > 0) {
    flock.run();
    flock.update();
  }
  else {
    noLoop();
    console.log("All the boids are dead.")
  }
}

// Pause
function mousePressed() {
  isLooping() ? noLoop() : loop();
}

 function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
 }


// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flock object

function Flock() {
  // An array for all the boids
  this.boids = []; // Initialize the array
}

Flock.prototype.run = function () {
  for (let i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids); // Passing the entire list of boids to each boid individually
  }
}

Flock.prototype.update = function () {
  this.remove_dead_boids();
}

Flock.prototype.addBoid = function (b) {
  this.boids.push(b);
}

Flock.prototype.remove_dead_boids = function () {
  this.boids = this.boids.filter(boid => boid.life_force > 0);
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Boid class
// Methods for Separation, Cohesion, Alignment added

function Boid(x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = createVector(x, y);
  this.r = 3.0;
  this.maxspeed = 3; // Maximum speed
  this.maxforce = 0.05; // Maximum steering force
  this.colour_name = random_color(); 
  this.colour = color_named(this.colour_name);
  this.life_force = max_life_force; //random(min_life_force, max_life_force);
}

Boid.prototype.run = function (boids) {
  this.flock(boids);
  this.update();
  this.borders();
  this.render();
}

Boid.prototype.applyForce = function (force) {
  // We could add mass here if we want A = F / M
  this.acceleration.add(force);
}

// We accumulate a new acceleration each time based on three rules
Boid.prototype.flock = function (boids) {
  let feather_mates = boids.filter(boid => this.of_a_feather(boid));
  let sep = this.separate(feather_mates); // Separation
  let ali = this.align(feather_mates); // Alignment
  let coh = this.cohesion(feather_mates); // Cohesion
  // Arbitrarily weight these forces
  sep.mult(1.5);
  ali.mult(1.0);
  coh.mult(1.0);
  // Add the force vectors to acceleration
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
}

// Method to update location
Boid.prototype.update = function () {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);
  // Update Life force
  if (this.life_force > 0) {
    this.life_force -= life_force_decrement; 
  } else {
    this.life_force = 0;
  }
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Boid.prototype.seek = function (target) {
  let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  let steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxforce); // Limit to maximum steering force
  return steer;
}

Boid.prototype.render = function () {
  // Draw a triangle rotated in the direction of velocity
  let theta = this.velocity.heading() + radians(90);
  alpha_value = (255 * this.life_force) / max_life_force;
  this.colour.setAlpha(alpha_value); 
  fill(this.colour);
  stroke(this.colour);
  push();
  translate(this.position.x, this.position.y);
  rotate(theta);
  beginShape();
  vertex(0, -this.r * 2);
  vertex(-this.r, this.r * 2);
  vertex(this.r, this.r * 2);
  endShape(CLOSE);
  pop();
}

// Wraparound
Boid.prototype.borders = function () {
  if (this.position.x < -this.r) this.position.x = width + this.r;
  if (this.position.y < -this.r) this.position.y = height + this.r;
  if (this.position.x > width + this.r) this.position.x = -this.r;
  if (this.position.y > height + this.r) this.position.y = -this.r;
}

// Separation
// Method checks for nearby boids and steers away
Boid.prototype.separate = function (boids) {
  let desiredseparation = 25.0;
  let steer = createVector(0, 0);
  let count = 0;
  // For every boid in the system, check if it's too close
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position, boids[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      let diff = p5.Vector.sub(this.position, boids[i].position);
      diff.normalize();
      diff.div(d); // Weight by distance
      steer.add(diff);
      count++; // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
}

// Alignment
// For every nearby boid in the system, calculate the average velocity
Boid.prototype.align = function (boids) {
  let neighbordist = 50;
  let sum = createVector(0, 0);
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position, boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].velocity);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    let steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}

// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function (boids) {
  let neighbordist = 50;
  let sum = createVector(0, 0); // Start with empty vector to accumulate all locations
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position, boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].position); // Add location
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum); // Steer towards the location
  } else {
    return createVector(0, 0);
  }
}

Boid.prototype.of_a_feather = function (boid) {
  return this.colour_name === boid.colour_name
}


function random_color () {
  colors = ['blue_2','yellow','orange','blue_3','blue_4','blue_5',];
  i = random(number_of_groups);
  c = colors[int(i) % colors.length];
  return c;
}
// see https://clrs.cc/
function color_named (name) {
  colors = {
    aqua:    color(0x7f,0xdb,0xff),
    blue:    color(0x00,0x74,0xd9),
    lime:    color(0x01,0xff,0x70),
    navy:    color(0x00,0x1f,0x3f),
    teal:    color(0x39,0xcc,0xcc),
    olive:   color(0x3d,0x99,0x70),
    green:   color(0x2e,0xcc,0x40),
    red:     color(0xff,0x41,0x36),
    maroon:  color(0x85,0x14,0x4b),
    orange:  color(0xff,0x85,0x1b),
    purple:  color(0xb1,0x0d,0xc9),
    yellow:  color(0xff,0xdc,0x00),
    fuchsia: color(0xf0,0x12,0xbe),
    gray:    color(0xaa,0xaa,0xaa),
    white:   color(0xff,0xff,0xff),
    black:   color(0x11,0x11,0x11),
    silver:  color(0xdd,0xdd,0xdd),
    blue_1:  color(0x3B,0x50,0x8A),
    blue_2:  color(0x6D,0x95,0xFF),
    blue_3:  color(0x5C,0x7D,0xD6),
    blue_4:  color(0x41,0x58,0x96),
    blue_5:  color(0x30,0x41,0x70),
    sky: color(0x11,0x11,0x11)
  };
  return colors[name];
}


