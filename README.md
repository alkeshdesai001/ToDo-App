# RateCity Developer Test

Your task is to build a ReactJS powered 

Test 1: 
Product listing Page:
- request a list of items using JSON REST api detailed below.
- render the table of results to page
- add ability to paginate the collection

========================================= OR ========================================

Test 2:
Compare Rate Component
- Allow user to input interest rates
- Render graph to show where the user entered rate is compared against the products returned by the APIS

========================================= OR =========================================

Test 3:
Build Similar Products component as per desing provided here :
- Component needs to be responsive
- Data needs to come from API provided below


Our expectations:
- Redux for state management (where necessary)
- Good component structure
- ES6 
- Surprise us

## Notes
Use a starter kit of your choice.
Feel free to use npm packages to help you achieve a result.

## Deliverable

#### Please don't push branches,
Submit a pull request against this repository. Developers will review your code and ask you questions in the pull request.

We will pull your code and execute the following commands:
```
npm install
npm start
```
These commands should start a Node.JS server and serve your app in development mode. We expect the terminal to display a URL to see your code in browser. Recommended url is `http://localhost:3000`

## API Detail

API Endpoint:<br />
`https://blaze.ratecity.com.au/api/search/home-loans`

Paginate by passing the page parameter:<br />
`https://blaze.ratecity.com.au/api/search/home-loans?page=2`

API will return you an object that looks something like this:
```json
{
  "filters": [],
  "hits": [
    {
      "advertised_rate":3.88,
      "comparison_rate":4.28,
      "company": {
        "supplier_reference": "LCOM",
        "name": "loans.com.au",
        "logo":"//cdn.ratecity.com.au/companies/logo/lcom/small_lcom_logo.png",
        "name":"loans.com.au"
      }
    }
  ],
  "meta": {
    "hit_count": 25,
    "page": 1,
    "page_count": 3,
    "page_size": 25,
    "total_count": 71
  }
}
```
