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

      var divs=d3.select("body").selectAll("div")
      .data(dataset)
      .enter()
      .append("div")
      .attr('width', 1400)
      .attr('id', function(d){
        return d.name})

        divs.selectAll("img")
        .data(function(d){
          return d.films
        })
        .enter()
        .append("img")
        .attr('src', function(d){
          console.log(d.picture)
          return d.picture})
        .attr('width', 150)
        .attr('height', 225)






},function(err){console.log(err)})
