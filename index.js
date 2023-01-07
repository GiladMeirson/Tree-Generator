const GEN = {};
GEN.canvas;
GEN.generateButton;
GEN.ctx;
//14 colors
GEN.color1_array = [
  "#B3833C",
  "#8D611F",
  "#795013",
  "#666600",
  "#2A4910",
  "#9E9844",
  "#AB851E",
  "#5B4C22",
  "#8A5C18",
  "#738A18",
  "#495222",
  "#BA8110",
  "#8E723A",
  "#325533",
  "#65461E",
  "#844E08",
  "#643A10",
  "#864401",
  "#C39A49",
  "#5C4C2C",
  "#645E3F",
  "#84601E",
  "#987E48",
  "#787546",
  "#723E12",



];
GEN.color2_array = [
  "#50B753",
  "#18701B",
  "#23C35D",
  "#55951C",
  "#93CE5F",
  "#167C27",
  "#235F2D",
  "#0DAF12",
  "#419244",
  "#B9AA61",
  "#E6CD4C",
  "#69E469",
  "#347334",
  "#DF6CD0",
  "#F06330",
  "#E8A062",
  "#5C842F",
  "#306E4F",
  "#F0539C",
  "#3E5526",
  "#306E4F",
  "#0E6B04",
  "#608E10",
  "#E24827",
  "#E2BE27",
  "#E2A527",
  "#D6A068",
  "#DCE56E",
  "#C0B268",
  "#C2E48A",
];

function Init() {
  GEN.canvas = document.querySelector("canvas");
  GEN.generateButton = document.querySelector(".generate-tree-button");
  GEN.canvas.width = window.innerWidth;
  GEN.canvas.height = window.innerHeight;
  GEN.ctx = GEN.canvas.getContext("2d");
  swal("Welcome to Generator-plant", "Please wait patiently between creations, it takes a few seconds");

}

function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
  GEN.ctx.beginPath();
  GEN.ctx.save();
  GEN.ctx.strokeStyle = color1;
  GEN.ctx.fillStyle = color2;

  GEN.ctx.shadowBlur = 7 + Math.floor(Math.random() * 8);
  GEN.ctx.shadowColor = "black";
  GEN.ctx.lineWidth = branchWidth;
  GEN.ctx.translate(startX, startY);
  GEN.ctx.rotate((angle * Math.PI) / 180);
  GEN.ctx.moveTo(0, 0);
  //ctx.lineTo(0, -len);
  if (angle < 0) {
    GEN.ctx.bezierCurveTo(GEN.curve2, -len / 2, GEN.curve2, -len / 2, 0, -len);
  } else {
    GEN.ctx.bezierCurveTo(GEN.curve2, -len / 2, -GEN.curve2, -len / 2, 0, -len);
  }
  GEN.ctx.stroke();

  if (len < 8) {
    GEN.ctx.beginPath();
    GEN.ctx.arc(0, -len, GEN.leafDense, 0, Math.PI / 2);
   if (Math.random()>0.8) {
      GEN.ctx.arc(0, -len, GEN.leafDense, 0, Math.PI/8 );
   }
    GEN.ctx.fill();
    GEN.ctx.restore();
    return;
  }
  //curve=Math.random()*16+3;
  let off = 1;
  if (Math.random() > 0.5) {
    off = -1;
  }
  let num1=(550+Math.random()*230)/1000
  let num2=(550+Math.random()*230)/1000
  let num3=(550+Math.random()*230)/1000
  drawTree(0, -len, len * 0.68, angle + GEN.curve, branchWidth * num1);
  drawTree(0, -len, len * 0.71, angle - GEN.curve, branchWidth * num2);

  if (Math.random() > 0.65) {
    drawTree(0, -len, len * 0.55, angle -0.45 * GEN.curve, branchWidth * num3);
  }
  GEN.ctx.restore();
}

window.addEventListener("resize", function () {
  GEN.canvas.width = window.innerWidth;
  GEN.canvas.height = window.innerHeight;

  //   drawTree(
  //     GEN.canvas.width / 2,
  //     GEN.canvas.height - 80,
  //     100,
  //     0,
  //     15,
  //     "brown",
  //     "green"
  //   );
  //Genrator();
});

function Genrator() {
  GEN.ctx.clearRect(0, 0, GEN.canvas.width, GEN.canvas.height);
  let center = GEN.canvas.width / 2;
  let len = 0;

  if (window.innerWidth < 600) {
    len = Math.floor(Math.random() * 20) + 120;
    GEN.curve = Math.random() * 7 + 3;
  } else {
    len = Math.floor(Math.random() * 45) + 200;
    GEN.curve = Math.random() * 25 + 6;
  }

  GEN.curve2 = Math.random() * 14 + 5;
  let angle = 0;
  let branchWidth = Math.random() * 40 + 20;

  if (Math.random() > 0.95) {
    GEN.ctx.globalCompositeOperation = "destination-over";
  } else {
    GEN.ctx.globalCompositeOperation = "source-over";
  }

  let color1 =
    GEN.color1_array[Math.floor(Math.random() * GEN.color1_array.length)];
  let color2 =
    GEN.color2_array[Math.floor(Math.random() * GEN.color2_array.length)];
  GEN.generateButton.style.background = color1;
  GEN.leafDense = Math.floor(Math.random() * 28) + 8;
  drawTree(
    center,
    GEN.canvas.height - 80,
    len,
    angle,
    branchWidth,
    color1,
    color2
  );
}

function displayImage() {
  const dataUri = GEN.canvas.toDataURL();
  document.getElementById("ResImage").src = dataUri;
  //$("#DisplayImg").fadeIn(750);

  ///////////////////////////////////////
  // Get the modal
  var modal = document.getElementById("myModal");
  //modal.style.display = "block";
  $("#myModal").fadeIn(750);

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    //modal.style.display = "none";
    $("#myModal").fadeOut(750);
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      //modal.style.display = "none";
      $("#myModal").fadeOut(750);
    }
  };
}

function DownloadIMG() {
  if (window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(GEN.canvas.msSaveBlob(), "canvasGenrator.png");
  } else {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = GEN.canvas.toDataURL();
    a.download = "canvasGenrator.png";
    a.click();
    document.body.removeChild(a);
  }
}

function InfoModal() {
  // Get the modal
  var modal = document.getElementById("myModal2");
  //modal.style.display = "block";
  $("#myModal2").fadeIn(750);

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[1];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    //modal.style.display = "none";
    $("#myModal2").fadeOut(750);
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      //modal.style.display = "none";
      $("#myModal2").fadeOut(750);
    }
  };
}


function DownloadAmount(amount) {

  for (let i = 0; i < amount; i++) {
    
    Genrator();
    const dataUri = GEN.canvas.toDataURL();
    document.getElementById("ResImage").src = dataUri;
    DownloadIMG();
    
  }
  
}

function AutoDownloadClick() {
  let amount=parseInt(document.getElementById('amountIN').value);
  swal({
    title: "Are you sure?",
    text: `${amount} Image files will be download on your computer !`,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("Okay lets download!", {
        icon: "success",
      });
      DownloadAmount(amount);
    } else {
      swal("another time");
    }
  });
  
}
