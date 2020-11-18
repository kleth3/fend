const validateInput = (input) => {
  // Create a new date instance dynamically with JS
  let d = new Date();
  d.setHours(0, 0, 0, 0);
  if(input.city === ""){
    throw new Error("City cannot be empty");
  }
  if(!input.start){
    throw new Error("Start Date cannot be empty");
  }
  else if(new Date(input.start) < d){
    throw new Error("Start date must be after today");
  }

  if(!input.end){
    throw new Error("You must enter an end date");
  }
  else if(new Date(input.end) < new Date(input.start)){
    throw new Error("End date must be after the start date");
  }

}

export { validateInput }