'use strict';

const can = document.querySelector('canvas');
const c = can.getContext('2d');

const w = can.width = innerWidth;
const h = can.height = innerHeight;

const particles = [];


function init() {
  Particle.add(100);
  
  loop();
}


function random_number(min, max) {
  if (min > max) [max, min] = [min, max];
  return Math.random() * (max - min + 1) + min;
}

function random_color() {
  const hex = '0123456789ABCDEF';
  let code = '#';
  
  for (let i=0; i<6; i++) code += hex[Math.floor(random_number(0, 6))];
  
  return code;
}

const get_distance = (a, b) => Math.hypot((a.x - b.x), (a.y - b.y));


class Particle {
  constructor() {
    this.size = 2;
    
    this.x = random_number(this.size, w - this.size);
    this.y = random_number(this.size, h - this.size);
    
    this.speed = {
      x: random_number(-2, 2),
      y: random_number(-2, 2),
    }
    
    this.color = random_color();
  }
  
  static add(length) {
    for (let i=0; i<length; i++) {
      particles.push(new Particle());
    }
  }
  
  update() {
    new Map([
      ['x', w],
      ['y', h],
    ])
    .forEach((screen, cord) => {
      if (this[cord] < this.size || this[cord] + this.size > screen) {
        this.speed[cord] *= -1;
      }
    });
    
    
    this.x += this.speed.x;
    this.y += this.speed.y;
  }
  
  draw() {
    for (let i=0; i<particles.length; i++) {
      const particle = particles[i];
      
      if (i === particles.indexOf(this) || get_distance(this, particle) > 50) continue;
      
      if (this.x > particle.x) {
        c.strokeStyle = '#f5f5f5';
        c.lineWidth = 0.3;
        
        c.beginPath();
          c.moveTo(this.x, this.y);
          c.lineTo(particle.x, particle.y);
          c.stroke();
        c.closePath();
      }
    }
    
    c.fillStyle = this.color;
    c.beginPath();
      c.arc(this.x, this.y, this.size, 0, 2*Math.PI);
      c.fill();
    c.closePath();
  }
}


function loop() {
  c.clearRect(0, 0, w, h);
  render();
  requestAnimationFrame(loop);
}


function render() {
  particles.forEach(p => {
    p.update();
    p.draw();
  });
}


init();