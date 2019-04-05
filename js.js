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

      for (i=0;i<dataset.length;i++){
        d3.select("body").append("a")
        .attr('href', function(){
          return "#"+dataset[i].name
        })
        .append("button")
        .text(function(){return dataset[i].name})
        .attr('class', 'buttons')
      }



      d3.select("body").selectAll("svg")
      .data(dataset)
      .enter()
      .append("svg")
      .attr('width', 1400)
      .attr('id', function(d){return d.name})

},function(err){console.log(err)})
