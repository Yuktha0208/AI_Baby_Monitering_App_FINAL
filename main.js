status="";
object=[];
alarm="";

function preload(){
    alarm=loadSound("Alarm.wav");
}

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(380,380);

    Object_Detector= ml5.objectDetector("cocossd",ModelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function draw(){
    image(video,0,0,380,380);

    if(status != ""){
        Object_Detector.detect(video, gotResults);
        r=random(255);
        g=random(255);
        b=random(255);

        for(i=0;i< object.length; i++){
            document.getElementById("status").innerHTML= "Status: Object Detected";

          fill(r,g,b);
          text(object[i].label, object[i].x + 15 , object[i].y + 15);
          noFill();
          stroke(r,g,b)
          rect(object[i].x , object[i].y , object[i].width , object[i].height);

            if(object[i].label == "person"){
                document.getElementById("baby_detector").innerHTML="Status: Baby Is Detected";
                alarm.stop();
            }else{
                document.getElementById("baby_detector").innerHTML="Status: Baby Is Not Detected";
                alarm.play();
        }
    }

    if(object.length == 0){
        document.getElementById("baby_detector").innerHTML="Status: Baby Is Not Detected";
        alarm.play();
    }

    }
    
}

function ModelLoaded(){
    console.log("Model Loaded");
    status= true;
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        object=results;
    }
}