/**

Author: Akintade Britto;
Year: 2018;
Description: A Vanilla-js library to convert amount in one currency to another.

*/

let currencies_url;

        currencies_url = "https://free.currencyconverterapi.com/api/v5/currencies";

        fetch(currencies_url)
        .then(res => res.json())
        .then(JSONdata => JSobj = JSONdata)
        .then(function() {
            console.log(JSobj);
            const results = JSobj.results;
            let resultsKeys = Object.keys(results);
            // let resultsValues = Object.values(results);
            let dropdownText = "";
            for (item of resultsKeys){
                dropdownText += `<option value="${results[item].id}">${results[item].id} (${results[item].currencyName})</option>`;
            }
            document.getElementById("fromThisCurrencyId").innerHTML = `<option value="">From</option>${dropdownText}`;
            document.getElementById("toThatCurrencyId").innerHTML = `<option value="">To</option>${dropdownText}`;
            console.log(dropdownText);
        });


        function convertCurrency() {
	      let amountEntered, fromInput, toInput, query, conversionDetails, conversion_url, conversionRate, convertedValue;
		  amountEntered = document.getElementById("amountInThisCurrency").value;
		  fromCurrency = encodeURIComponent(document.getElementById("fromThisCurrencyId").value);
      toCurrency = encodeURIComponent(document.getElementById("toThatCurrencyId").value);
		  if (amountEntered == "") {
		    alert("Enter an amount");
		  	return false;
		  } else if (fromCurrency == "") {
		    alert("Choose a Currency to convert from");
		  	return false;
		  } else if (toCurrency == "") {
		    alert("Select a Currency to convert to");
		  	return false;
		  }
		  amount = Math.abs(amountEntered);
          query = `${fromCurrency}_${toCurrency}`;
		  conversion_url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}`;

          fetch(conversion_url)
          .then(res => res.json())
          .then(data => conversionDetails = data)
          .then(function() {
          	conversionRate = conversionDetails.results[query].val;
          	convertedValue = amount * conversionRate;
          	document.getElementById("conversionResultField").value = convertedValue;
            document.getElementById('conversionResult').innerHTML = `${amountEntered} <span><b>${fromCurrency}</b></span> = ${convertedValue} <b>${toCurrency}</b>`
          	// console.log(convertedValue);
          })
          .catch(() => console.log(`Failed to fetch from ${url}`));

		}