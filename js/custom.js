/*
  Name: Custom Js for Covid 19
  Author:
  Technology: JavaScript, Jquery, Fetch, ajax 
*/

// Fetch total covid 19 data from Rapid API 

fetch("https://covid-19-data.p.rapidapi.com/totals?format=undefined", {
  "method": "GET",
  "headers": {
    "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
    "x-rapidapi-key": "e1e8da9850msh38c1f226278b451p11c487jsn6eed9bddfd01"
  }
})
  .then(response => {
    return response.json();
  }).then(data => {
    // console.log(data[0]);
    $('#confirmed').text(data[0]['confirmed']);
    $('#recovered').text(data[0]['recovered']);
    $('#deaths').text(data[0]['deaths']);
    let active = data[0]['confirmed'] - data[0]['recovered'] - data[0]['deaths'];
    $('#active').text(active);
  })
  .catch(err => {
    console.log(err);
  });

// Fetch Daily World data from pomber github
fetch("https://pomber.github.io/covid19/timeseries.json")
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    last = function (array, n) {
      if (array == null)
        return void 0;
      if (n == null)
        return array[array.length - 1];
      return array.slice(Math.max(array.length - n, 0));
    };

    countries = [];

    let i = 0;
    for (var k in data) {
      countries[i] = {};
      let details = last(data[k]);
      countries[i]['srno'] = i + 1;
      countries[i]['country'] = k;
      // countries[i]['date'] = details.date;
      countries[i]['confirmed'] = details.confirmed;
      countries[i]['active'] = details.confirmed - details.recovered - details.deaths;
      countries[i]['recovered'] = details.recovered;
      countries[i]['deaths'] = details.deaths;
      i++;
    }

    // console.log(countries);

    // Create DataTable for world

    $('#worldsTable').DataTable({

      data: countries,
      columns: [
        { data: 'srno' },
        { data: 'country' },
        { data: 'confirmed' },
        { data: 'active' },
        { data: 'recovered' },
        { data: 'deaths' }
      ],
      ordering: true,
      order: [2, "desc"],
      paging: false,
      scrollY: 500,
      info: false,
      "fnRowCallback": function (nRow, data, iDisplayIndex) {
        $("td:first", nRow).html(iDisplayIndex + 1);
        return nRow;
      }
    });

    // Draw Regions Map for World

    google.charts.load('current', {
      'packages': ['geochart'],
      // Note: you will need to get a mapsApiKey for your project.
      // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
      'mapsApiKey': 'AIzaSyBTPcnxhtITirkEo86zV1SmQmBmqGI1esk'
    });
    google.charts.setOnLoadCallback(drawRegionsMap);


    function drawRegionsMap() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Country');
      data.addColumn('number', 'Confirmed');

      for (let i = 0; i < countries.length; i++) {
        data.addRow([countries[i]['country'], parseInt(countries[i]['confirmed'])]);
      }

      var options = {
        colorAxis: { colors: ['#B3E5FC', '#03A9F4', '#0288D1'] },
        backgroundColor: '#2d3035',
        // colorAxis: {colors: ['#03A9F4','#303F9F']}
      };

      var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

      chart.draw(data, options);
    }

    // World Table

    google.charts.load('current', {
      'packages': ['table'],
      'mapsApiKey': 'AIzaSyBTPcnxhtITirkEo86zV1SmQmBmqGI1esk'
    });

    google.charts.setOnLoadCallback(drawWorldTable);
    function drawWorldTable() {
      var data = new google.visualization.DataTable();
      // data.addColumn('number','Sr No');
      data.addColumn('string', 'Country');
      data.addColumn('number', 'Confirmed');
      data.addColumn('number', 'Active');
      data.addColumn('number', 'Recovered');
      data.addColumn('number', 'Deaths');

      // console.log(statewise);
      for (let i = 0; i < countries.length; i++) {
        data.addRow([countries[i]['country'], parseInt(countries[i]['confirmed']), parseInt(countries[i]['active']), parseInt(countries[i]['recovered']), parseInt(countries[i]['deaths'])]);
        data.setRowProperty(0, i, 'style', 'color:#fff !important');
      }


      var options = {
        showRowNumber: true, width: '100%', height: '100%', backgroundColor: '#2d3035'
      }
        ;

      var table = new google.visualization.Table(document.getElementById('worldTable'));

      table.draw(data, options);
    }




  })

// fetch data statewise for India

fetch("https://api.covid19india.org/data.json")
  .then(response => response.json())
  .then(data => {


    // console.log(data);
    let statewise = data["statewise"];
    let states = [];
    // console.log(statewise.length)
    for (var i = 0; i < statewise.length; i++) {
      // console.log(statewise[i]);
      // console.log(statewise[i]['state']);
      states[i] = {};
      // states[i][statewise[i]["state"]] = statewise[i]['confirmed'];
      states[i]['state'] = statewise[i]['state']
      states[i]['active'] = statewise[i]['active'];
      states[i]['confirmed'] = statewise[i]['confirmed'];
      states[i]['deaths'] = statewise[i]['deaths'];
    }

    let total = data["statewise"][0]
    // console.log(total);
    $('#confirmedState').text(total.confirmed);
    $('#activeState').text(total.active);
    $('#recoveredState').text(total.recovered);
    $('#deathsState').text(total.deaths);

    // console.log(states);

    // Draw India Map

    google.charts.load('current', {
      'packages': ['geochart'],
      'mapsApiKey': 'AIzaSyBTPcnxhtITirkEo86zV1SmQmBmqGI1esk'
    });
    google.charts.setOnLoadCallback(drawRegionMap);
    function drawRegionMap() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'State');
      data.addColumn('number', 'Confirmed');

      for (let i = 1; i < states.length; i++) {
        data.addRow([states[i]['state'], parseInt(states[i]['confirmed'])])
      }

      var options = {
        domain: 'IN',
        region: 'IN',
        colorAxis: { colors: ['#B3E5FC', '#03A9F4', '#0288D1'] },
        displayMode: 'regions',
        resolution: 'provinces',
        backgroundColor: '#2d3035',
        datalessRegionColor: '#2d3035',
        defaultColor: '#ffffff',
      };

      var chart = new google.visualization.GeoChart(document.getElementById('india_map'));

      chart.draw(data, options);
    }

    // Draw Table for India
    google.charts.load('current', {
      'packages': ['table'],
      'mapsApiKey': 'AIzaSyBTPcnxhtITirkEo86zV1SmQmBmqGI1esk'
    });
    // let dailyReport = data['cases_time_series'];
    google.charts.setOnLoadCallback(drawTable);
    function drawTable() {
      var data = new google.visualization.DataTable();
      data.addColumn('number', 'Sr No');
      data.addColumn('string', 'State');
      data.addColumn('number', 'Confirmed');
      data.addColumn('number', 'Active');
      data.addColumn('number', 'Recovered');
      data.addColumn('number', 'Deaths');

      // console.log(statewise);
      for (let i = 1; i < statewise.length; i++) {
        data.addRow([i, statewise[i]['state'], parseInt(statewise[i]['confirmed']), parseInt(statewise[i]['active']), parseInt(statewise[i]['recovered']), parseInt(statewise[i]['deaths'])]);
        data.setRowProperty(0, i, 'style', 'color:#fff !important');
      }

      data.addRow([null, statewise[0]['state'], parseInt(statewise[0]['confirmed']), parseInt(statewise[0]['active']), parseInt(statewise[0]['recovered']), parseInt(statewise[0]['deaths'])])
      var options = { showRowNumber: false, width: '100%', height: '100%', backgroundColor: '#2d3035' };

      var table = new google.visualization.Table(document.getElementById('indiaTable'));

      table.draw(data, options);

    }
    // console.log(statewise);
    states_list = [];
    let j = 0;
    for (let i = 1; i < statewise.length; i++) {
      states_list[j] = {};
      // states_list[j]['srno'] = i;
      states_list[j]['state'] = statewise[i]['state'];
      states_list[j]['confirmed'] = parseInt(statewise[i]['confirmed']);
      states_list[j]['active'] = parseInt(statewise[i]['active']);
      states_list[j]['recovered'] = parseInt(statewise[i]['recovered']);
      states_list[j]['deaths'] = parseInt(statewise[i]['deaths']);
      j++;

    }
    /* Formatting function for row details - modify as you need */

    // console.log(states_list);
    $('#indiansTable').DataTable({

      data: states_list,
      columns: [
        {
          "className": 'details-control',
          "orderable": false,
          "data": null,
          "defaultContent": ''
        },
        { data: 'state' },
        { data: 'confirmed' },
        { data: 'active' },
        { data: 'recovered' },
        { data: 'deaths' }
      ],
      ordering: true,
      order: [2, "desc"],
      paging: false,
      select: {
        selector: 'td:not(:first-child)',
        style: 'os'
      },
      scrollY: 500,
      info: false,
      "fnRowCallback": function (nRow, data, iDisplayIndex) {
        $("td:first", nRow).html(iDisplayIndex + 1);
        return nRow;
      }
    });

    // line chart for daily confirmed india

    google.charts.load('current', {
      'packages': ['corechart'],
      'mapsApiKey': 'AIzaSyBTPcnxhtITirkEo86zV1SmQmBmqGI1esk'
    });
    let dailyReport = data['cases_time_series'];
    // console.log(dailyReport);
    google.charts.setOnLoadCallback(dailyConfirmed);
    function dailyConfirmed() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Date');
      data.addColumn('number', 'Confirmed');


      for (let i = 0; i < dailyReport.length; i++) {
        data.addRow([dailyReport[i]['date'], parseInt(dailyReport[i]['dailyconfirmed'])]);
      }
      var options = {
        series: {
          0: {
            color: '#FFC107'
          }
        },
        curveType: 'function',
        animation: {
          easing: 'linear'
        },
        legend: { position: 'right', textStyle: { color: '#fff' } },
        backgroundColor: '#2d3035',
        pointsVisible: true,
        vAxis: {
          title: 'Daily Confirmed',
          titleTextStyle: {
            color: '#fff'
          },
          baselineColor: '#ffffff',
          gridlines: { color: '#fff' },
          textStyle: {
            color: '#fff'
          },
          minValue: 0
        },
        hAxis: {
          title: 'Date',
          titleTextStyle: {
            color: '#fff'
          },
          textStyle: {
            color: '#fff'
          }
        }

      };

      var chart = new google.visualization.LineChart(document.getElementById('confirmedDailyIndians'));

      chart.draw(data, options);

    }

    // line chart for total confirmed india

    google.charts.setOnLoadCallback(totalConfirmed);
    function totalConfirmed() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Date');
      data.addColumn('number', 'Confirmed');


      for (let i = 0; i < dailyReport.length; i++) {
        data.addRow([dailyReport[i]['date'], parseInt(dailyReport[i]['totalconfirmed'])]);
      }
      var options = {
        series: {
          0: {
            color: '#FFC107'
          }
        },
        curveType: 'function',
        animation: {
          easing: 'linear'
        },
        legend: { position: 'right', textStyle: { color: '#fff' } },
        backgroundColor: '#2d3035',
        pointsVisible: true,
        vAxis: {
          title: 'Total Confirmed',
          titleTextStyle: {
            color: '#fff'
          },
          baselineColor: '#ffffff',
          gridlines: { color: '#fff' },
          textStyle: {
            color: '#fff'
          },
          minValue: 0
        },
        hAxis: {
          title: 'Date',
          titleTextStyle: {
            color: '#fff'
          },
          textStyle: {
            color: '#fff'
          }
        }

      };

      var chart = new google.visualization.LineChart(document.getElementById('confirmedTotalIndians'));

      chart.draw(data, options);

    }

    // line chart for daily recovered india

    google.charts.setOnLoadCallback(dailyRecovered);
    function dailyRecovered() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Date');
      data.addColumn('number', 'Recovered');


      for (let i = 0; i < dailyReport.length; i++) {
        data.addRow([dailyReport[i]['date'], parseInt(dailyReport[i]['dailyrecovered'])]);
      }
      var options = {
        series: {
          0: {
            color: '#4CAF50'
          }
        },
        curveType: 'function',
        animation: {
          easing: 'linear'
        },
        legend: { position: 'right', textStyle: { color: '#fff' } },
        backgroundColor: '#2d3035',
        pointsVisible: true,
        vAxis: {
          title: 'Daily Recovered',
          titleTextStyle: {
            color: '#fff'
          },
          baselineColor: '#ffffff',
          gridlines: { color: '#fff' },
          textStyle: {
            color: '#fff'
          },
          minValue: 0
        },
        hAxis: {
          title: 'Date',
          titleTextStyle: {
            color: '#fff'
          },
          textStyle: {
            color: '#fff'
          }
        }

      };

      var chart = new google.visualization.LineChart(document.getElementById('recoveredDailyIndians'));

      chart.draw(data, options);

    }

    // line chart for total recovered india

    google.charts.setOnLoadCallback(totalRecovered);
    function totalRecovered() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Date');
      data.addColumn('number', 'Recovered');


      for (let i = 0; i < dailyReport.length; i++) {
        data.addRow([dailyReport[i]['date'], parseInt(dailyReport[i]['totalrecovered'])]);
      }
      var options = {
        series: {
          0: {
            color: '#4CAF50'
          }
        },
        curveType: 'function',
        animation: {
          easing: 'linear'
        },
        legend: { position: 'right', textStyle: { color: '#fff' } },
        backgroundColor: '#2d3035',
        pointsVisible: true,
        vAxis: {
          title: 'Total Recovered',
          titleTextStyle: {
            color: '#fff'
          },
          baselineColor: '#ffffff',
          gridlines: { color: '#fff' },
          textStyle: {
            color: '#fff'
          },
          minValue: 0
        },
        hAxis: {
          title: 'Date',
          titleTextStyle: {
            color: '#fff'
          },
          textStyle: {
            color: '#fff'
          }
        }

      };

      var chart = new google.visualization.LineChart(document.getElementById('recoveredTotalIndians'));

      chart.draw(data, options);

    }

    // line chart for daily deaths india

    google.charts.setOnLoadCallback(dailyDeaths);
    function dailyDeaths() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Date');
      data.addColumn('number', 'Deaths');


      for (let i = 0; i < dailyReport.length; i++) {
        data.addRow([dailyReport[i]['date'], parseInt(dailyReport[i]['dailydeceased'])]);
      }
      var options = {
        series: {
          0: {
            color: '#FF5252'
          }
        },
        curveType: 'function',
        animation: {
          easing: 'linear'
        },
        legend: { position: 'right', textStyle: { color: '#fff' } },
        backgroundColor: '#2d3035',
        pointsVisible: true,
        vAxis: {
          title: 'Daily Deaths',
          titleTextStyle: {
            color: '#fff'
          },
          baselineColor: '#ffffff',
          gridlines: { color: '#fff' },
          textStyle: {
            color: '#fff'
          },
          minValue: 0
        },
        hAxis: {
          title: 'Date',
          titleTextStyle: {
            color: '#fff'
          },
          textStyle: {
            color: '#fff'
          }
        }

      };

      var chart = new google.visualization.LineChart(document.getElementById('deathsDailyIndians'));

      chart.draw(data, options);

    }

    // line chart for total Deaths india

    google.charts.setOnLoadCallback(totalDeaths);
    function totalDeaths() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Date');
      data.addColumn('number', 'Deaths');


      for (let i = 0; i < dailyReport.length; i++) {
        data.addRow([dailyReport[i]['date'], parseInt(dailyReport[i]['totaldeceased'])]);
      }
      var options = {
        series: {
          0: {
            color: '#FF5252'
          }
        },
        curveType: 'function',
        animation: {
          easing: 'linear'
        },
        legend: { position: 'right', textStyle: { color: '#fff' } },
        backgroundColor: '#2d3035',
        pointsVisible: true,
        vAxis: {
          title: 'Total Deaths',
          titleTextStyle: {
            color: '#fff'
          },
          baselineColor: '#ffffff',
          gridlines: { color: '#fff' },
          textStyle: {
            color: '#fff'
          },
          minValue: 0
        },
        hAxis: {
          title: 'Date',
          titleTextStyle: {
            color: '#fff'
          },
          textStyle: {
            color: '#fff'
          }
        }

      };

      var chart = new google.visualization.LineChart(document.getElementById('deathsTotalIndians'));

      chart.draw(data, options);

    }

    // Draw Table for Maharashtra


    var settings = {
      "url": "https://api.covid19india.org/state_district_wise.json",
      "method": "GET",
    };

    $.ajax(settings).done(function (response) {
      // console.log(response);
      let i = 0;
      data = [];
      for (var k in response) {
        data[i] = {};
        // console.log(response[k]);

        data[i]['state'] = k;

        for (var d in response[k]) {
          // console.log(response[k][d]);
          var dist = []
          let a = 0;
          for (var kd in response[k][d]) {
            dist[a] = {};
            dist[a]['distName'] = kd;
            dist[a]['confirmed'] = response[k][d][kd]['confirmed'];
            //  console.log(kd);
            a++;
          }
          data[i]['distData'] = dist;
        }
        i++;
      }
      console.log(data);
      for (i = 0; i < data.length; i++) {
        $('#accordion').append(`
          <div class="card">
            <div class="card-header text-left" id="heading${i}">
              <h5 class="mb-0">
                <a href="#" class="text-white" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                  ${data[i]['state']}
                </a>
              </h5>
            </div>

            <div id="collapse${i}" class="collapse show" aria-labelledby="heading${i}" data-parent="#accordion">
              <div class="card-body">
                <table id="distdata${i}">
                  <thead>
                    <th>District</th>
                    <th>Confirmed</th>
                  </thead>
                </table>
              </div>
            </div>
          </div>`)

          let distData = data[i]['distData']

        
            // console.log(statewise);
            dist_list = [];
            let j = 0;
            for (let k = 1; k < distData.length; k++) {
              dist_list[j] = {};
              // states_list[j]['srno'] = i;
              dist_list[j]['dist'] = distData[k]['distName'];
              dist_list[j]['confirmed'] = parseInt(distData[k]['confirmed']);
              j++;
        
            }
            /* Formatting function for row details - modify as you need */
        
            // console.log(states_list);
            $('#distdata'+i).DataTable({
        
              data: dist_list,
              columns: [
                { data: 'dist' },
                { data: 'confirmed' },
              ],
              ordering: true,
              order: [1, "desc"],
              paging: false,
              scrollY: 500,
              info: false
            });
      }
    });


  });

// News section


// fetch all countries data

fetch("https://restcountries-v1.p.rapidapi.com/all", {
  "method": "GET",
  "headers": {
    "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
    "x-rapidapi-key": "e1e8da9850msh38c1f226278b451p11c487jsn6eed9bddfd01"
  }
})
  .then(response => {
    return response.json();
  })
  .then(data => {


    for (let i = 0; i < data.length; i++) {
      $('#countryName').append(`<option value="${data[i]['alpha2Code']}"> 
                                         ${data[i]['name']} 
                                    </option>`);
    }


  })
  .catch(err => {
    console.log(err);
  });


// $('#selectValue').html(selectValueTemplate);
// country name trigger

var settings = {
  "url": "https://newsapi.org/v2/everything?q=covid&from=2020-03-31&apiKey=10c01e251d8f46e1b584a0099f45c907",
  "method": "GET",
};

$.ajax(settings).done(function (response) {

  $('#news_card').html(``);
  $('#news_country').html(`<h1 class="text-white">World News</h1>`);

  let articles = response.articles;

  if (articles.length > 0) {
    for (let i = 0; i < articles.length; i++) {
      $('#news_card').append(
        `<div class="col-md-3">
                    <div class="card" style="width: 18rem;">
                      <img class="card-img-top" src="${articles[i]['urlToImage']}" alt="Card image cap">
                      <div class="card-body">
                        <h5 class="card-title">${articles[i]['title']}</h5>
                        <a target="_blank" href="${articles[i]['url']}" class="btn btn-primary">Read More</a>
                      </div>
                    </div>
                  </div>`
      )
    }
  }
  else {
    $('#news_card').html(
      `<h3 class="text-white text-center">No News Available</h3>`
    )
  }

});

$('#countryName').click(function () {
  let country_vlaue = $('#countryName').val();
  // console.log(country_vlaue);

  if (country_vlaue != '' || country_vlaue == null) {

    // fetch top headlines as per country value 

    var settings = {
      "url": "https://newsapi.org/v2/top-headlines?country=" + country_vlaue + "&from=2020-03-31&q=covid&apiKey=10c01e251d8f46e1b584a0099f45c907",
      "method": "GET",
    };

    $.ajax(settings).done(function (response) {

      $('#news_card').html(``);
      let countryNameTitle = $("#countryName option:selected").html();
      $('#news_country').html(`<h1 class="text-white">${countryNameTitle}</h1>`);
      console.log(response);

      let articles = response.articles;

      if (articles.length > 0) {
        for (let i = 0; i < articles.length; i++) {
          $('#news_card').append(
            `<div class="col-md-3">
                        <div class="card" style="width: 18rem;">
                          <img class="card-img-top" src="${articles[i]['urlToImage']}" alt="Card image cap">
                          <div class="card-body">
                            <h5 class="card-title">${articles[i]['title']}</h5>
                            <a target="_blank" href="${articles[i]['url']}" class="btn btn-primary">Read More</a>
                          </div>
                        </div>
                      </div>`
          )
        }
      }
      else {
        $('#news_card').html(
          `<h3 class="text-white text-center">No News Available</h3>`
        )
      }

    });

    country_vlaue = '';

  }
  else {
    $('#news_card').html(
      `<h3 class="text-white text-center">Please select County</h3>`
    )
  }

})


