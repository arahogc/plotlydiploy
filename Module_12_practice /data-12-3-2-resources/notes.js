//open template then use below data to see all data in samples.json in console
d3.json("samples.json").then(function(data){
    console.log(data);
});

//using map to get specific data values from all array values

d3.json("samples.json").then(function(data){
    wfreq = data.metadata.map(person => person.wfreq);
    console.log(wfreq);
});

//using sort with map to put data in descending order 
d3.json("samples.json").then(function(data){
    wfreq = data.metadata.map(person =>
person.wfreq).sort((a,b) => b - a);
    console.log(wfreq);
});

//to delete null values 
d3.json("samples.json").then(function(data){
    wfreq = data.metadata.map(person =>
person.wfreq).sort((a,b) => b - a);
    filteredWfreq = wfreq.filter(element => element !=
null);
    console.log(filteredWfreq);
});

//if given the below sampe, use Object.entries to get each key-value pair (in console.log)
researcher1 = {
    name: 'Roza',
    age: 34,
    hobby: 'Hiking'
};

console.log(Object.entries(researcher1));
 
//forEach() iterates each element in the array 
researcher1.forEach(([first, second]) => console.log(first
    + ": " + second));

//for samples.json use below code to display metadata of any person using Object.entries and forEach
//have to define each perosn though, in this case the first person 
d3.json("samples.json").then(function(data){
    firstPerson = data.metadata[0];
    Object.entries(firstPerson).forEach(([key, value]) =>
      {console.log(key + ': ' + value);});
});

//to get around error of "Need a Http address"-make sure your html file is open
python -m http.server

