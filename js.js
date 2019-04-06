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
        .style('left', (i+1)*30)
      }

      // creat div for each director
      var divs=d3.select("body").selectAll("div")
      .data(dataset)
      .enter()
      .append("div")
      .attr('class', 'bigdiv')
      .attr('id', function(d){
        return d.name})

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
      .style('left', function(d,i){
        if (i>4){
          return -750+(i-5)*30}
        else{return i*30}
      })
      .style('top', function(d,i){
        if (i>4){return 250}
        else{return 0}
      })

      var info=divs.append("div").attr('class', 'info')
      info.append("p")
      .text('Title: ')
      .append("span")
      .attr('class', 'title')
      info.append("p")
      .text('Realease Date: ')
      .append("span")
      .attr('class', 'date')
      info.append("p")
      .text('Description: ')
      .append("span")
      .attr('class', 'description')







},function(err){console.log(err)})
