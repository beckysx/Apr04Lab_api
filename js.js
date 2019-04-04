var data=d3.json('https://ghibliapi.herokuapp.com/films')

data.then(function(d){

  var directors=[]
  d.forEach(function(d){
    if(directors.includes(d.director)==false){
      directors.push(d.director)
    }})

  var direcorList=[]
  directors.forEach(function(a,index){
    direcorList.push({"name":a,"films":[]})
    d.forEach(function(d){
      if (d.director==a){
        direcorList[index].films.push(d.title)
      }
    })
  })
console.log(direcorList)
  d3.select("body").selectAll("button")
  .data(direcorList)
  .enter()
  .append("button")
  .text(function(d){return d.name})
  .on('click', function(d){

  })


},function(err){console.log(err)})
