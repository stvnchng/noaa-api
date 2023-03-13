const mflag1Map = {
  "": "No measurement information applicable",
  B: "Precipitation total formed from two 12-hour totals",
  D: "Precipitation total formed from four six-hour totals",
  H: "Represents highest or lowest hourly temperature (TMAX or TMIN) or the average of hourly values (TAVG)",
  K: "Converted from knots",
  L: "Temperature appears to be lagged with respect to reported hour of observation",
  O: "Converted from oktas",
  P: "Identified as 'missing presumed zero' in DSI 3200 and 3206",
  T: "Trace of precipitation, snowfall, or snow depth",
  W: "Converted from 16-point WBAN code (for wind direction)",
};

const qflag1Map = {
  "": "Did not fail any quality assurance check",
  D: "Failed duplicate check",
  G: "Failed gap check",
  I: "Failed internal consistency check",
  K: "Failed streak/frequent-value check",
  L: "Failed check on length of multiday period",
  M: "Failed megaconsistency check",
  N: "Failed naught check",
  O: "Failed climatological outlier check",
  R: "Failed lagged range check",
  S: "Failed spatial consistency check",
  T: "Failed temporal consistency check",
  W: "Temperature too warm for snow",
  X: "Failed bounds check",
  Z: "Flagged as a result of an official Datzilla investigation",
};

const sflag1Map = {
  "": "Not available",
  0: "U.S. Cooperative Summary of the Day (NCDC DSI-3200)",
  6: "CDMP Cooperative Summary of the Day (NCDC DSI-3206)",
  7: "U.S. Cooperative Summary of the Day -- Transmitted via WxCoder3 (NCDC DSI-3207)",
  A: "U.S. Automated Surface Observing System (ASOS) real-time data (since January 1, 2006)",
  a: "Australian data from the Australian Bureau of Meteorology",
  B: "U.S. ASOS data for October 2000-December 2005 (NCDC DSI-3211)",
  b: "Belarus update",
  C: "Environment Canada",
  D: "Short time delay US National Weather Service CF6 daily summaries provided by the High Plains Regional Climate Center",
  E: "European Climate Assessment and Dataset (Klein Tank et al., 2002)",
  F: "U.S. Fort data",
  G: "Official Global Climate Observing System (GCOS) or other government-supplied data",
  H: "High Plains Regional Climate Center real-time data",
  I: "International collection (non U.S. data received through personal contacts)",
  K: "U.S. Cooperative Summary of the Day data digitized from paper observer forms (from 2011 to present)",
  M: "Monthly METAR Extract (additional ASOS data)",
  m: "Data from the Mexican National Water Commission (Comision National del Agua -- CONAGUA)",
  N: "Community Collaborative Rain, Hail,and Snow (CoCoRaHS)",
  Q: 'Data from several African countries that had been "quarantined", that is, withheld from public release until permission was granted from the respective meteorological services',
  R: "NCEI Reference Network Database (Climate Reference Network and Regional Climate Reference Network)",
  r: "All-Russian Research Institute of Hydrometeorological Information-World Data Center",
  S: "Global Summary of the Day (NCDC DSI-9618)",
  s: "China Meteorological Administration/National Meteorological Information Center/Climatic Data Center (http://cdc.cma.gov.cn)",
  T: "SNOwpack TELemtry (SNOTEL) data obtained from the U.S. Department of Agriculture's Natural Resources Conservation Service",
  U: "Remote Automatic Weather Station (RAWS) data obtained from the Western Regional Climate Center",
  u: "Ukraine update",
  W: "WBAN/ASOS Summary of the Day from NCDC's Integrated Surface Data (ISD)",
  X: "U.S. First-Order Summary of the Day (NCDC DSI-3210)",
  Z: "Datzilla official additions or replacements",
  z: "Uzbekistan update",
};

const form = document.querySelector("form");
const resultCountElement = document.getElementById("result-count");
const tbody = document.getElementById("station-data");
let lastSearch;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const stationId = document.querySelector("#station-id").value;
  if (stationId.trim() === "") {
    resultCountElement.textContent = "";
    return;
  }
  if (lastSearch !== stationId) {
    tbody.innerHTML = "";
    lastSearch = stationId;
    fetch(`/station/${stationId}`)
      .then((response) => response.json())
      .then((data) => {
        resultCountElement.textContent = `${data.length} results found for station with ID ${stationId}`;
        if (data.length) {
          resultCountElement.classList.remove("bg-secondary");
          console.log(data);
          data.forEach((record) => {
            const tr = document.createElement("tr");
            // <td>${record.station_id}</td>
            tr.innerHTML = `
              <td>${record.date}</td>
              <td>${record.element}</td>
              <td>${record.value1}</td>
              <td>${record.mflag1 !== "" ? mflag1Map[record.mflag1] : ""} ${
              record.qflag1 !== ""
                ? "<strong>" + qflag1Map[record.qflag1] + "</strong>"
                : ""
            }</td>
              <td>${sflag1Map[record.sflag1]}</td>
            `;
            tbody.appendChild(tr);
          });
        } else {
          resultCountElement.classList.add("bg-secondary");
        }
      })
      .catch((error) => {
        console.error("Error fetching station data:", error);
      });
  }
});
