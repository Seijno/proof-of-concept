import express from 'express';
import fetchJson from './helpers/fetch-json.js'


const app = express(),
result = [];

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

const apiUrl = 'https://fdnd-agency.directus.app/items/',
categorie = await fetchJson (apiUrl + 'deloitte_categories'),
subcategorie = apiUrl + 'deloitte_subcategories?filter[subcategory_id]=',
prompt = apiUrl + 'deloitte_prompts?filter[subcategorie]='


// loading index and GET categories
app.get('/', function(request, response) {
    fetchJson(categorie)
    response.render('index', {           
        items: categorie.data
    })
});

    // loading subcategorie with categorie id
app.get('/categorie/:id', async function(request, response) {
    fetchJson (`${subcategorie}${request.params.id}`).then((subcategorieData) => {
        response.render('categorie', {
            subcategorieItems: subcategorieData.data
        });
    })
});

    //loading prompt page with subcategorie id
app.get('/prompt/:id', async function(request, response) {
    fetchJson (`${prompt}${request.params.id}`).then((promptData) => {
        response.render('prompt', {
            promptItem: promptData.data
        });
    })
});

app.get('/result', async function(request, response) {
    response.render('result', {result})
});

    // data post
app.post('/result', function(req, res) {
    const textData = req.body.textData,
    textData2 = req.body.textData2,
    fileData = req.body.fileData,
    numberData = req.body.numberData,
    dateData = req.body.dateData;
    result.push(textData, fileData, dateData, textData2, numberData);
    res.redirect(301, '/result');
    console.log(result);
  });
  
// Stel het poortnummer in waar express naar moet gaan luisteren
app.set('port', process.env.PORT || 8001)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function() {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})