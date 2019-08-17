document.getElementById('loan-form').addEventListener('submit',function(e) {
  e.preventDefault();
  //hide result
  document.getElementById('results').style.display='none';

  //show loader
  document.getElementById('loading').style.display='block';
  setTimeout(function() {
    calResult();
  }, 2000);
});


function calResult(){

  const amount=document.getElementById('amount');
  const interest=document.getElementById('interest');
  const years=document.getElementById('years');

  const monthlyPay=document.getElementById('monthly-payment');
  const totalPay=document.getElementById('total-payment');
  const totalInterest=document.getElementById('total-interest');

  const princple=parseFloat(amount.value);
  const calculatedInterest=parseFloat(interest.value)/100/12;
  const calculatedPayments=parseFloat(years.value)*12;

  //monthly payments;
  const x=Math.pow(1+calculatedInterest,calculatedPayments);
  const monthly=(princple*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)){
    monthlyPay.value=monthly.toFixed(2);
    totalPay.value=(monthly*calculatedPayments).toFixed(2);
    totalInterest.value=((monthly*calculatedPayments)-princple).toFixed(2);
    document.getElementById('results').style.display='block';//show results
    document.getElementById('loading').style.display='none';
  }else{
      showerroe();
  }

}

function showerroe(){
  document.getElementById('results').style.display='none';
  document.getElementById('loading').style.display='none';
  const errorDiv=document.createElement('div');
  errorDiv.className='alert alert-danger';
  errorDiv.appendChild(document.createTextNode('Please check your numbers'));

  const card=document.querySelector('.card');
  const heading=document.querySelector('.heading');
  card.insertBefore(errorDiv,heading);

  setTimeout(function() {
      document.querySelector('.alert').remove();
  },3000);
}
