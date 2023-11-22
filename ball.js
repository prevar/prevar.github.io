var createRandom = function(divId){
    //Generate random x and y based on width and height of container

    //Get the container element and then its width and height
    /*var containerElement = document.getElementById(containerId);
    console.log("cont"+containerElement.id);
    var contWidth = containerElement.style.width;
    var contHeight = containerElement.style.height;
    console.log("contWidth="+contWidth);
    console.log("contHeight="+contHeight); */

    //Get a random number between 0 and 975 (container width-half of ball width)
    var x= Math.floor(Math.random()*(975));

    //If generated random number is less than 20, then add 20 as container starts 20 from left
    if(x <20) 
    { 
        x = x+20;
    }
    
    //Get a random number between 0 and 775 (container width-half of ball height)
    var y= Math.floor(Math.random()*775);
    
    //If generated random number is less than 20, then add 20 as container starts 20 from top
    if (y < 20) {y = y + 20;}

    //Print starting point of ball
    console.log("Starting Random Position of Ball : x="+x+", y="+y);
    
    // generate random color
    var r = Math.floor(255*(Math.random()));
    var g = Math.floor(255*(Math.random()));
    var b = Math.floor(255*(Math.random()));        
    var color = 'rgb(' + r + ', ' + g + ', ' + b + ')';

    // set div attributes
    var div = document.createElement('div');
    
    //Add the index to the id so ids are unique
    div.id = divId;
    div.style.zIndex = '1';
    div.style.position = 'absolute';    
    div.style.left = x + 'px';    
    div.style.top = y + 'px';    
    div.style.width = '50px';    
    div.style.height = '50px';    
    div.style.borderRadius = '50%';
    div.style.background = color;    

    // Then append the whole thing onto the body
    document.getElementsByTagName('body')[0].appendChild(div);

    // default start position
    div.x = x;
    div.y = y;
    return div;        
};

/* color function will change the color of the passed div to the r,g,b values passed
*/
var color = function(div, r, g, b){
    var color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    div.style.background = color; 
};

/*colorRandom will generate a random color and change the color of the passed div to this one.
*/
var colorRandom = function(div){

    var counter = 0;
    var limit = 3;

    var timerColor = function(div, x, y){
        if(counter >= limit) return;
        counter += 1;

        setTimeout(function(){
            // random color
            var r = Math.floor(255*(Math.random()));
            var g = Math.floor(255*(Math.random()));
            var b = Math.floor(255*(Math.random()));        
            var color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
            div.style.background = color; 
            timerColor(div);
        },500);
    };
    timerColor(div);
};


/**
 * moveBalls() will take the ballsArray and take out the balls one by one and move them
 * @returns 
 */
function moveBalls() {
    // two fixed x-axis coordinates (you will use these variable in step 3)
    var Xmin = 20;
    var Xmax = 975;
    var Ymin = 20;
    var Ymax = 775;
    var velocity = 5;

    for(var k=0;k<ballArray.length;k++) {
        //Take the ballElement out of the array one by one
        var ball = ballArray[k];

        var divElement = document.getElementById(ball.id)

        //Check the x position of the ball
        var positionX = divElement.style.left;

        //Remove the 'px' suffix from the left value and parse it as an int
        positionX = parseInt(positionX.substring(0, positionX.lastIndexOf('px')))
        //console.log("Current X="+positionX);
        
        //Repeat for y position
        var positionY = divElement.style.top;
        positionY = parseInt(positionY.substring(0, positionY.lastIndexOf('px')))
        //console.log("Current Y="+positionY);
        
        //Get Horizontal and vertical direction of movement of the ball
        var reverse = ball.reverse;
        var goingDown = ball.goingDown;
    
        //If ball is going left, x is decreasing, reduce velocity value from x
        if (reverse) {
        positionX = positionX - velocity;

        //If x position becomes <= the Xmin(on the container), then set x-position to Xmin so it doesnt go out of container
        if(positionX <=Xmin)
        {
            positionX = Xmin;
            //Once the ball touches the left of the container, make the ball black 
            color(divElement,0,0,0);
            divElement.style.borderRadius = "20%";
        }
        //console.log("X OUT OF BOUND SO x-v posX="+positionX);
        }
        else {
            //else add velocity to x position
            positionX = positionX + velocity;
            //If positionx becomes > right boundary of container, make x position= Xmax so it doesnt go out of container    
            if (positionX >= Xmax) {
                positionX = Xmax;
                //change color of ball to random when it touches right end of container
                colorRandom(divElement);
                divElement.style.borderRadius = "50%";
            }
            //console.log("X in range so x+v="+positionX);
        }

            //If Ball is going down, y needs to decrease so subtract velocity
        if (goingDown) {
            positionY = positionY - velocity;

            //If Y reaches bottom of container, set it to Ymin
            if(positionY < Ymin) {
                positionY = Ymin;
            }
            //console.log("GOING DOWN SO Y-V="+positionY);
        } //If ball is going up , y increases so add velocity
        else {
                positionY = positionY + velocity;
                
                // If y position > right end of container, set y to ymax
                if (positionY > Ymax) {
                    positionY = Ymax;
                }
                //console.log("going up so y+v="+positionY);
        }

        //Set the left and top values of the ball
        divElement.style.left = positionX + 'px';
        divElement.style.x = positionX ;
        
        divElement.style.top = positionY + 'px';
        divElement.style.y = positionY;
        
        //If ball is going out of bounds in either direction, reverse the direction
        if (positionX >= Xmax || positionX <= Xmin) {
            ball.reverse = !ball.reverse;
            console.log("x> xmax or = xmin ")
        }
    
        if (positionY >= Ymax || positionY <= Ymin) {
            ball.goingDown = !ball.goingDown;
            console.log("y>ymax or =min")
        }
    }
    return;
  }
  
//Create 10 balls with random color and position and store the div elements 
//in a ballArray
var ballArray = [];

    for (var i=0; i<10; i++) 
    {
        if (i >=2)
        {
            var half = Math.floor(i/2);
        }
        var id = 'div'+i;
        var divElement = createRandom(id);

        //create a new ball Object for every ball and set its x and y direction
        //and push into ballArray.
        var ballElement = {
            id: id, //id of div element
            posX:divElement.style.left, //left space
            posY: divElement.style.top,  //top space
            reverse: ((i>half)?true:false), //create half the balls going forward and other half reverse
            goingDown: ((i>half)?false:true) //create half balls going up, other half going down
        }

        //Add ball objects to the global array
        ballArray.push(ballElement);
    }
  
  // This call the moveBall function every 100ms
  setInterval(moveBalls, 30);

  
  

