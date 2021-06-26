song = "";
leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

score_left_Wrist = 0;

function preload() {
    song = loadSound("coffinDance.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center()
    video = createCapture(VIDEO);
    video.hide();

    posenetVar = ml5.poseNet(video, modelLoaded)
    posenetVar.on("pose", gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        score_left_Wrist = results[0].pose.keypoints[9].score;
        console.log("Score - Left_Wrist = " + score_left_Wrist)

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left_Wrist_X = " + leftWristX + "  Left_Wrist_Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right_Wrist_X = " + rightWristX + "  Right_Wrist_Y = " + rightWristY);
    }
}

function modelLoaded() {
    console.log("PoseNet Has Been Initialized");
}

function draw() {
    image(video, 0, 0, 600, 500);
    circle(rightWristX, rightWristY, 20);

    if (rightWristY > 0 && rightWristY <= 100) {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }

    if (rightWristY > 100 && rightWristY <= 200) {
        document.getElementById("speed").innerHTML = "Speed = 2.0x";
        song.rate(2.0);
    }

    if (rightWristY > 200 && rightWristY <= 300) {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }

    if (rightWristY > 300 && rightWristY <= 400) {
        document.getElementById("speed").innerHTML = "Speed = 1.0x";
        song.rate(1.0);
    }

    if (rightWristY > 400 && rightWristY <= 500) {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }

    fill("red");
    stroke("black");
    if (score_left_Wrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        numY = Number(leftWristY);
        remove_decimal = floor(numY);
        volume = remove_decimal / 500;
        volume = 1 - volume;
        vol1 = volume.toFixed(1)
        song.setVolume(volume);
        document.getElementById("volume").innerHTML = "Volume = " + vol1;
    }
}

function play() {
    song.play()
    song.setVolume(1);
    song.rate(1);
}

function stop() {
    song.stop()
}