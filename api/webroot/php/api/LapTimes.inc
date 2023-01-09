<?php
if ($driverStandings || $constructorStandings) error(400, "Bad Request: Lap time queries do not support standings qualifiers.");
if (isset($circuits) || isset($grid) || isset($fastest) || isset($results) || isset($status)) error(400, "Bad Request: Lap time queries do not support the specified qualifiers.");
if (!isset($year) || !isset($round)) error(400, "Bad Request: Lap time queries require a season and round to be specified.");

// Race&Circuit Info
$query = "SELECT ra.year, ra.round, ra.name, ra.date, ra.time, ra.url,
    ci.circuitRef, ci.name, ci.location, ci.country, ci.url, ci.lat, ci.lng, ci.alt 
    FROM races ra
    LEFT JOIN circuits ci ON ra.circuitId=ci.circuitId";

$query .= " WHERE ra.year='$year' AND ra.round='$round LIMIT 1'";
$result = mysql_query($query) or die('I cannot select from the database because: ' . mysql_error());

while ($row = @mysql_fetch_array($result)) {
    $race = [
        'year' => $row[0],
        'round' => $row[1],
        'name' => $row[2],
        'date' => $row[3],
        'time' => $row[4],
        'url' => $row[5],
    ];

    $circuit = [
        'circuitRef' => $row[6],
        'name' => $row[7],
        'location' => $row[8],
        'country' => $row[9],
        'url' => $row[10],
        'lat' => $row[11],
        'lng' => $row[12],
        'alt' => $row[13],
    ];

}

$query = "SELECT dr.driverRef, la.lap, la.position, la.time
    FROM lapTimes la 
    LEFT JOIN races ra ON la.raceId=ra.raceId
    LEFT JOIN drivers dr ON la.driverId=dr.driverId";

$query .= " WHERE ra.year='$year' AND ra.round='$round'";

if ($driver) $query .= " AND dr.driverRef='$driver'";
if ($laps) $query .= " AND la.lap='$laps'";

$query .= " ORDER BY la.lap, la.position LIMIT $offset, $limit";

$result = mysql_query($query) or die('I cannot select from the database because: ' . mysql_error());

if ($result) {
    $total = mysql_num_rows($result);
    $doRaceHeader = true;

    switch ($format) {
        case 'xml':
            doXMLHeader($url, $series, $limit, $offset, $total);

            echo "\t<RaceTable";
            if (isset($year)) echo " season=\"$year\"";
            if (isset($round)) echo " round=\"$round\"";
            if (isset($driver)) echo " driverId=\"$driver\"";
            if (isset($laps)) echo " lap=\"$laps\"";
            echo ">\n";
            while ($row = @mysql_fetch_array($result)) {
                $driverRef = $row[0];
                $lap = $row[1];
                $position = $row[2];
                $time = $row[3];

                if ($doRaceHeader) {
                    $doRaceHeader = false;
                    $year = $race['year'];
                    $round = $race['round'];
                    $raceName = $race['name'];
                    $date = $race['date'];
                    $start = $race['time'];
                    $raceUrl = $race['url'];
                    $circuitId = $circuit['circuitRef'];
                    $circuitName = $circuit['name'];
                    $locality = $circuit['location'];
                    $country = $circuit['country'];
                    $circuitUrl = $circuit['url'];
                    $lat = $circuit['lat'];
                    $long = $circuit['lng'];
                    echo "\t\t<Race season=\"$year\" round=\"$round\" url=\"$raceUrl\">\n";
                    echo "\t\t\t<RaceName>$raceName</RaceName>\n";
                    echo "\t\t\t<Circuit circuitId=\"$circuitId\" url=\"$circuitUrl\">\n";
                    echo "\t\t\t\t<CircuitName>$circuitName</CircuitName>\n";
                    echo "\t\t\t\t<Location lat=\"$lat\" long=\"$long\">\n";
                    echo "\t\t\t\t\t<Locality>$locality</Locality>\n";
                    echo "\t\t\t\t\t<Country>$country</Country>\n";
                    echo "\t\t\t\t</Location>\n";
                    echo "\t\t\t</Circuit>\n";
                    echo "\t\t\t<Date>$date</Date>\n";
                    if ($start) {
                        $start .= "Z";
                        echo "\t\t\t<Time>$start</Time>\n";
                    }
                    echo "\t\t\t<LapsList>\n";
                }

                if ($lap != $currentLap) {
                    if ($currentLap) {
                        echo "\t\t\t\t</Lap>\n";
                    }
                    echo "\t\t\t\t<Lap number=\"$lap\">\n";
                    $currentLap = $lap;
                }
                echo "\t\t\t\t\t<Timing driverId=\"$driverRef\" lap=\"$lap\" position=\"$position\" time=\"$time\"/>\n";
            }
            if ($currentLap) {
                echo "\t\t\t\t</Lap>\n";
                echo "\t\t\t</LapsList>\n";
                echo "\t\t</Race>\n";
            }
            echo "\t</RaceTable>\n";
            echo "</MRData>\n";
            break;

        case 'json':
            if ($callback) {
                doJSONPHeader($url, $series, $limit, $offset, $total, $callback);
            } else {
                doJSONHeader($url, $series, $limit, $offset, $total);
            }
            echo "\"RaceTable\":{";
            echo "\"season\":\"$year\"";
            echo ",\"round\":\"$round\"";
            if (isset($driver)) echo ",\"driverId\":\"$driver\"";
            if (isset($lap)) echo ",\"lap\":\"$lap\"";

            echo ",\"Races\":[";
            if ($doRaceHeader) {
                $year = $race['year'];
                $round = $race['round'];
                $raceName = $race['name'];
                $date = $race['date'];
                $start = $race['time'];
                $raceUrl = escape($race['url']);
                $circuitId = $circuit['circuitRef'];
                $circuitName = $circuit['name'];
                $locality = $circuit['location'];
                $country = $circuit['country'];
                $circuitUrl = $circuit['url'];
                $lat = $circuit['lat'];
                $long = $circuit['lng'];
                echo "{";
                echo "\"season\":\"$year\",";
                echo "\"round\":\"$round\",";
                echo "\"url\":\"$raceUrl\",";
                echo "\"raceName\":\"$raceName\",";
                echo "\"Circuit\":{";
                echo "\"circuitId\":\"$circuitId\",";
                echo "\"url\":\"$circuitUrl\",";
                echo "\"circuitName\":\"$circuitName\",";
                echo "\"Location\":{";
                echo "\"lat\":\"$lat\",";
                echo "\"long\":\"$long\",";
                echo "\"locality\":\"$locality\",";
                echo "\"country\":\"$country\"";
                echo "}";
                echo "},";
                echo "\"date\":\"$date\",";
                if ($start) {
                    $start .= "Z";
                    echo "\"time\":\"$start\",";
                }

                //  Laps\":[   { \"number\":\"$lap\",\"Timings\":[ {   },{  } ] } , { repeat }  ]}]}}}
                echo "\"Laps\":[";
            }
            while ($row = @mysql_fetch_array($result)) {
                $driverRef = $row[0];
                $lap = $row[1];
                $position = $row[2];
                $time = $row[3];

                if ($lap != $currentLap) {
                    if ($currentLap) {
                        echo "}]},";
                    }
                    echo "{\"number\":\"$lap\",\"Timings\":[";
                    $currentLap = $lap;
                } else {
                    echo "},";
                }
                echo "{";
                echo "\"driverId\":\"$driverRef\",";
                echo "\"position\":\"$position\",";
                echo "\"time\":\"$time\"";
            }                                               // End while
            echo "}]}]}";
            echo "]}}}";
            if ($callback) {
                echo ")";
            }
            break;
    }
} else {
    error(404, "Not Found");
}

?>
