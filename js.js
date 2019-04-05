var data=d3.json('https://ghibliapi.herokuapp.com/films')

data.then(function(d){

      //get dataset
      var directors=[]
      d.forEach(function(d){
        if(directors.includes(d.director)==false){
          directors.push(d.director)
        }})
      var dataset=[]
      directors.forEach(function(a,i){
        dataset.push({"name":a,"films":[]})
        d.forEach(function(d){
          if (d.director==a){
            var movie={"title":d.title,"release_date":d.release_date,"description":d.description,"picture":d.title+".png"}
            dataset[i].films.push(movie)}
        })})
      console.log(dataset)

      // create button inside <a>
      for (i=0;i<dataset.length;i++){
        d3.select("body").append("a")
        .attr('href', function(){
          return "#"+dataset[i].name
        })
        .append("button")
        .text(function(){return dataset[i].name})
        .attr('class', 'buttons')
      }

      d3.select("body").selectAll("g")
      .data(dataset)
      .enter()
      .append("g")
      .attr('width', 1400)
      .attr('id', function(d){return d.name})


      for (i=0;i<dataset.length;i++){
        var g=d3.select("#"+dataset[i].name)
        g.selectAll("svg:image")
        .data(dataset[i].films)
        .enter()
        .append("svg:image")
        .attr('xlink:href', function(d){return d.picture})
        .attr('width', 400)
      }




},function(err){console.log(err)})
