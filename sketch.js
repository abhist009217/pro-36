//Create variables here
var dog,dog1,dog2;
var database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;

function preload()
{
	//load images here
dog1=loadImage("images/dogImg.png");
dog2=loadImage("images/dogImg1.png")

}

function setup() {
	database=firebase.database();
  createCanvas(1000,500);
dog=createSprite(250,300,150,150);
dog.addImage(dog1);
dog.scale=0.2;

foodstock=database.ref("food");
foodstock.on("value",readStock);
foodObj=new Food();
feed = createButton("Feed The Dog");
feed.position(700,95);
feed.mousePressed(feedDog);
addFood=createButton("add food");
addFood.position(800,95);
addFood.mousePressed(addFoods);


  
}


function draw() {  

  background("red");
  foodObj.display();
  fedTime=database.ref("feedtime");
  fedTime.on("value",function(data){
    lastFed=data.val();

  })
 fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
  drawSprites();
 

}
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);

}
function feedDog(){
  dog.addImage(dog2);
  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  database.ref("/").update({
    food:foodObj.getFoodStock(),
    feedtime:hour()
  })
}
function addFoods(){
  foodS++
  database.ref("/").update({
    food:foodS
  })
}




