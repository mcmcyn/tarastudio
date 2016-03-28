var counter = 0;
function changeBG(){
    var imgs = [
        "url(https://images.unsplash.com/32/6Icr9fARMmTjTHqTzK8z_DSC_0123.jpg?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1375)",
        "url(https://images.unsplash.com/photo-1453738773917-9c3eff1db985?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1375)",
        "url(https://images.unsplash.com/photo-1453576109701-aef2d431a8a4?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1375)",
        "url(https://images.unsplash.com/uploads/1412282232015a06e258a/4bdd2a58?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1375)",
        "url(https://images.unsplash.com/photo-1414839246800-1ed50eb905e7?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1375)",
        "url(https://images.unsplash.com/photo-1452722464566-db26e74a995b?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1375)",
        "url(https://images.unsplash.com/photo-1457052002176-2d16a4f4a3ff?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1375)",
        "url(https://images.unsplash.com/photo-1431069826965-10c61a19b835?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1375)"
      ]
    
    if(counter === imgs.length) counter = 0;
    $("body").css("background-image", imgs[counter]);

    counter++;
}
  
  setInterval(changeBG, 3000);


