import express from 'express';
import fetchJson from './helpers/fetch-json.js'


const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

const apiUrl = 'https://fdnd-agency.directus.app/items/',
categorie = await fetchJson (apiUrl + 'deloitte_categories'),
subcategorie = apiUrl + 'deloitte_subcategories?filter[subcategory_id]=',
prompt = apiUrl + 'deloitte_prompts?filter[label]='


app.get('/', function(request, response) {
 
    fetchJson(categorie)
        response.render('index', {           
            items: categorie.data

        })
    });

app.get('/categorie/:id', async function(request, response) {
    fetchJson (`${subcategorie}${request.params.id}`).then((subcategorieData) => {
        response.render('categorie', {
            subcategorieItems: subcategorieData.data,
            promptItems: promptData.data
        });
    })
  });

app.get('/prompt/:label', async function(request, response) {
    console.log(prompt)
    fetchJson (`${prompt}${request.params.label}`).then((promptData) => {
        response.render('prompt', {
            promptItems: promptData.data
        });
    })
  });
// Stel het poortnummer in waar express naar moet gaan luisteren
app.set('port', process.env.PORT || 8001)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function() {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})