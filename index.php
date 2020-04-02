<?php 
  require('header.php');
?>
    
      <section class="no-padding-bottom">
        <div class="container-fluid">
          <div class="row pt-5">
            <div class="col-lg-6">
              <div class="block text-center">
                <h2 class="text-white">World</h2>
              </div>
              <div class="row">
                <div class="col-md-3">
                  <div class="card text-center p-1 h-75">
                    <h4>Total <br />Confirmed</h4>
                        <h2 id="confirmed" class="text-primary"></h2>
                  </div>
                </div>
                <div class="col-md-3 ">
                  <div class="card text-center p-1 h-75">
                    <h4>Total <br />Active</h4>
                        <h2 id="active" class="text-warning"></h2>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="card text-center p-1 h-75">
                    <h4>Total <br />Recovered</h4>
                        <h2 id="recovered" class="text-success"></h2>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="card text-center p-1 h-75">
                    <h4>Total <br />Deaths</h4>
                        <h2 id="deaths" class="text-danger"></h2>
                  </div>
                </div>
              </div>
              <div class="block text-center">
                <div id="regions_div" style="width: 100%; height: 100%;"></div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="block text-center">
                <a href="/covid-19/details"><h2>India</h2></a>
              </div>
              <div class="row">
                <div class="col-md-3">
                  <div class="card text-center p-1 h-75">
                    <h4>Total <br />Confirmed</h4>
                        <h2 id="confirmedState" class="text-primary"></h2>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="card text-center p-1 h-75">
                    <h4>Total <br>Active</h4>
                        <h2 id="activeState" class="text-warning"></h2>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="card text-center p-1 h-75">
                    <h4>Total <br />Recovered</h4>
                        <h2 id="recoveredState" class="text-success"></h2>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="card text-center p-1 h-75">
                    <h4>Total <br />Deaths</h4>
                        <h2 id="deathsState" class="text-danger"></h2>
                  </div>
                </div>
              </div>
              <div class="block text-center">
                <div id="india_map" style="width: 100%; height: 100%;"></div>
                <!-- <a href="/covid-19/details.php" class="btn btn-primary">Details</a> -->
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="no-padding-bottom">
        <div class="container-fluid">
          <div class="card text-center">
            <h1 class="text-white">Spread Trends</h1>
          </div>
        </div>
      </section>
      <section class="no-padding-bottom">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-6">
              <div class="block text-center">
                <h2 class="text-white">WORLD COVID-19 TRACKER</h2>
                <!-- <div id="worldTable" style="width: 100%; height: 914px"></div> -->
                <table width="100%" id="worldsTable" class="display compact">
                  <thead>
                    <th>Sr. No.</th>
                    <th>Country</th>
                    <th>Confirmed</th>
                    <th>Active</th>
                    <th>Recovered</th>
                    <th>Deaths</th>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="col-md-6">
              <div class="block text-center">
                <h2 class="text-white">INDIA COVID-19 TRACKER</h2>
                <!-- <div id="indiaTable" style="width:100%; height:914px"></div> -->
                <table width="100%" id="indiansTable" class="display compact">
                  <thead>
                    <!-- <th></th> -->
                    <th>Sr. No.</th>
                    <th>State</th>
                    <th>Confirmed</th>
                    <th>Active</th>
                    <th>Recovered</th>
                    <th>Deaths</th>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="no-padding-bottom">
        <div class="container-fluid">
          <div class="block text-center">

            <h3>We are working on more Information... Stay Tuned...!</h3>
          </div>
        </div>
      </section>

    <?php 
      include 'footer.php';
    ?>