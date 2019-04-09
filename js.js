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
            var movie={"title":d.title,"release_date":d.release_date,"description":d.description,"picture":d.title+".png","director":d.director.replace(/\s*/g,"").toLowerCase()}
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
        .style('left', (i+1)*30)
      }

      // creat div for each director
      var divs=d3.select("body").selectAll("div")
      .data(dataset)
      .enter()
      .append("div")
      .attr('class', 'bigdiv')
      .attr('id', function(d){
        return d.name.replace(/\s*/g,"").toLowerCase()})

      divs.append("h3")
      .text(function(d){
        return d.name})

      // divs

      divs.selectAll("img")
      .data(function(d){
        return d.films
      })
      .enter()
      .append("img")
      .attr('src', function(d){
        return d.picture})
      .attr('width', 150)
      .attr('height', 225)
      .on('mouseover',function(){
        d3.select(this)
        .attr('width', 170)
        .attr('height', 245)

      } )
      .on('mouseout',function(){
        d3.select(this)
        .attr('width', 150)
        .attr('height', 225)
      } )
      .on("click",function(d){
        var change=d3.select("#"+d.director)
        change.select(".title")
        .text(d.title)
        change.select(".date")
        .text(d.release_date)
        change.select(".description")
        .text(d.description)

      })

      var info=divs.append("div").attr('id', 'info')
      info.append("p")
      .text('Title:   ')
      .style('font-size', 20)
      .append("span")
      .attr('class', 'title')
      info.append("p")
      .text('Realease Date:   ')
      .style('font-size', 20)
      .append("span")
      .attr('class', 'date')
      info.append("p")
      .text('Description:   ')
      .style('font-size', 20)
      .append("span")
      .attr('class', 'description')








},function(err){console.log(err)})
