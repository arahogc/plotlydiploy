d3.selectAll("body").on("change", updatePage);

function optionChanged(newSample) {
  console.log(newSample);
}


function updatePage() {
  var dropdownMenu = d3.selectAll("#selectOption").node();
  var dropdownMenuID = dropdownMenu.id;
  var selectedOption = dropdownMenu.value;

  console.log(dropdownMenuID);
  console.log(selectedOption);
  console.log(d3.selectAll("#menu").node().id);
};

