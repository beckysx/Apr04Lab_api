var data=d3.json('https://ghibliapi.herokuapp.com/films')

data.then(function(d){

  var directors=[]
  d.forEach(function(d){
    if(directors.includes(d.director)==false){
      directors.push(d.director)
    }})

  var dataset=[]
  directors.forEach(function(a,index){
    dataset.push({"name":a,"films":[]})
    d.forEach(function(d){
      if (d.director==a){
        var movie={"title":d.title,"release_date":d.release_date,"description":d.description}
        dataset[index].films.push(movie)
      }
    })
  })
console.log(dataset)
  d3.select("body").selectAll("button")
  .data(dataset)
  .enter()
  .append("button")
  .text(function(d){return d.name})
  .on('click', function(d){

  })

},function(err){console.log(err)})
