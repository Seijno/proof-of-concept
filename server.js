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
prompt = apiUrl + 'deloitte_prompts?filter[subcategorie]='


// index renderen en categories ophalen
app.get('/', function(request, response) {
 
    fetchJson(categorie)
        response.render('index', {           
            items: categorie.data

        })
    });

    // subcategorie laden
app.get('/categorie/:id', async function(request, response) {
    fetchJson (`${subcategorie}${request.params.id}`).then((subcategorieData) => {
        response.render('categorie', {
            subcategorieItems: subcategorieData.data
            // promptItems: promptData.data
        });
    })
  });

    //prompt page
app.get('/prompt/:id', async function(request, response) {
    fetchJson (`${prompt}${request.params.id}`).then((promptData) => {
        console.log(promptData);
        response.render('prompt', {
            promptItem: promptData.data
        });
    })
  });

//   404 error pagina
//   app.use(function(request, responds, next) {
//     request.status(404);

//     if (request.accepts('html')) {
//       responds.render('404', { url: req.url });
//       return;
//     }
// })
  
// Stel het poortnummer in waar express naar moet gaan luisteren
app.set('port', process.env.PORT || 8001)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function() {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})