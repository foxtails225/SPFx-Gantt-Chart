import * as React from 'react';
import { FC } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import * as qs from 'qs'
import _ from 'underscore';

import { IGanttChartProps } from './IGanttChartProps';
import { config, urls } from './constant';

const GanttChart: FC<IGanttChartProps> = (props) => {
  const [types, setTypes] = React.useState([]);
  const [source, setSource] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState("");
  const colorSet = ['#808000', '#FFFF00', '#00FF00', '#00FFFF', '#FF00FF', '#0000FF', '#FF0000', '#000080', '#008080',
    '#008000', '#800080', '#800000', '#808080', '#FEC433', '#C0C0C0'];

  React.useEffect(() => {
    const fetchData = async () => {
      let result: Array<any>;
      const token = await getAccessToken();
      const response = await axios(urls.getChartType, { headers: { Authorization: `Bearer ${token}` } });
      const data = response.data.values.filter(item => item.every(el => el !== ""));

      data.map((item: Array<any>, idx: Number) => {
        if (idx !== 0) {
          result.push(_.object(data[0], item));
        }
      });
      setTypes(result);
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      let result: Array<any>;
      const token = await getAccessToken();
      const response = await axios(urls.getResource, { headers: { Authorization: `Bearer ${token}` } });
      const data = response.data.values.filter(item => item.every(el => el !== ""));

      data.map((item: Array<any>, idx: Number) => {
        if (idx !== 0) {
          result.push(_.object(data[0], item));
        }
      });
      setSource(result);
    };

    fetchData();
  }, []);

  const getAccessToken = async () => {
    const url = "https://login.windows.net/" + config.tenent_id + "/oauth2/token?api-version=1.0";
    const data = {
      'grant_type': "client_credentials",
      'resource': "https://graph.microsoft.com",
      'client_id': config.client_id,
      'client_secret': config.client_secret,
      'client-type': 'Single-Page Application',
      'scopo': config.scope,
    };

    const configToken = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded',
        "Host": 'graph.microsoft.com'
      },
      // credentials: "include"
    }

    // const response = await axios.post(url, qs.stringify(data), configToken);
    // axios.post(url, qs.stringify(data), configToken).then((respo) =>{
    //   console.log(respo);
    // }).catch(error => {
    //   console.log(error);
    // });
    // return response.data.access_token
    return "eyJ0eXAiOiJKV1QiLCJub25jZSI6IlZPT0t4Y3F5SGsxWXQwZm0yb0hKZUs0bTZSbFpXUjhDamhQYXNRTVRRR00iLCJhbGciOiJSUzI1NiIsIng1dCI6Imh1Tjk1SXZQZmVocTM0R3pCRFoxR1hHaXJuTSIsImtpZCI6Imh1Tjk1SXZQZmVocTM0R3pCRFoxR1hHaXJuTSJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9jMjBhMDgxYi1jMDYzLTRlZWMtYTY5Ni1hYjEwZDFlMTVlNzAvIiwiaWF0IjoxNTk2NTI4MzEyLCJuYmYiOjE1OTY1MjgzMTIsImV4cCI6MTU5NjUzMjIxMiwiYWlvIjoiRTJCZ1lKQU1ySnYyT3M2WDNUOS8wV09HK3JPMkFBPT0iLCJhcHBfZGlzcGxheW5hbWUiOiJHYW50dC1DaGFydC1BdXRoIiwiYXBwaWQiOiI1YWQ5MzcxNy0xZWY3LTRmMWEtYWQ5OS1mZDM5ZWNiZGVhOGUiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9jMjBhMDgxYi1jMDYzLTRlZWMtYTY5Ni1hYjEwZDFlMTVlNzAvIiwib2lkIjoiNWE1MGM5NjctNWM0ZC00ZGU0LWJhOGItODY5MDE2YWZmNjcxIiwic3ViIjoiNWE1MGM5NjctNWM0ZC00ZGU0LWJhOGItODY5MDE2YWZmNjcxIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6Ik5BIiwidGlkIjoiYzIwYTA4MWItYzA2My00ZWVjLWE2OTYtYWIxMGQxZTE1ZTcwIiwidXRpIjoiQmI1SkI2bUJHa3lnaW5rOWFCa0pBQSIsInZlciI6IjEuMCIsInhtc190Y2R0IjoxNTk2MDI2MDUwfQ.2lA8Utdc9VeSgSvUIgOwqRWuetLdOdWWX-YN-FjuprCAfiCkNJwhOTrDNcMFH2fj8ZyLTn9cJ9so5Ns55s6IQ7rpYJA_fzYmdR3NlikrISFSid2gxDGaaSRzJ7UDsbQF29K7liAcl6C2ZmbmkgV6JdraU2SarqgFfxnYV8KV2dqLwt8MB9BAzKDqTGSAalFqCG0Jp8ZNmUiFX65kDyZm-MzuQes1FqDdhhcahFMNUJhppV9aIxRJFkfU9zHNC0wlI7VqHlbeABlt6azgwSbpgfxRsBjpWOc7kZFYyNYkmdmk3B3f_wZVZaDpd8_1avDtCRmuH7-vZyhO19N0QeiDcw";
  };

  // console.log(types);
  // console.log(source);

  return (
    <Plot
      data={[
        {
          x: [1, 2, 3],
          y: [2, 6, 3],
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'red' },
        },
        { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
      ]}
      layout={{ width: "100%", height: "auto", title: 'A Fancy Plot' }}
    />
  );
};

export default GanttChart;
