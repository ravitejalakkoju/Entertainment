$(document).ready(function(){
    animateDiv('.a');
    animateDiv('.b');
    animateDiv('.c');
    animateDiv('.d');
    animateDiv('.e');
    animateDiv('.f');
    animateDiv('.g');
    animateDiv('.h');
    animateDiv('.i');
    animateDiv('.j');
    animateDiv('.k');
    animateDiv('.l');
    animateDiv('.m');
    animateDiv('.n');
    animateDiv('.o');
    animateDiv('.p');
    animateDiv('.q');
    animateDiv('.r');
    animateDiv('.s');
    animateDiv('.t');
    animateDiv('.u');
    animateDiv('.v');
    animateDiv('.w');
    animateDiv('.x');
    animateDiv('.y');
    animateDiv('.z');
    animateDiv('.a2');
    animateDiv('.b2');
    animateDiv('.c2');
    animateDiv('.d2');
    animateDiv('.e2');
    animateDiv('.f2');
    animateDiv('.g2');
    animateDiv('.h2');
    animateDiv('.i2');
    animateDiv('.j2');
    animateDiv('.k2');
    animateDiv('.l2');
    animateDiv('.m2');
    animateDiv('.n2');
    animateDiv('.o2');
    animateDiv('.p2');
    animateDiv('.q2');
    animateDiv('.r2');
    animateDiv('.s2');
    animateDiv('.t2');
    animateDiv('.u2');
    animateDiv('.v2');
    animateDiv('.w2');
    animateDiv('.x2');
    animateDiv('.y2');
    animateDiv('.z2');
});


function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
    
}

function animateDiv(myclass){
    var newq = makeNewPosition();
    $(myclass).animate({ top: newq[0], left: newq[1] }, 10000,   function(){
    //   animateDiv(myclass);        
    });
    
};