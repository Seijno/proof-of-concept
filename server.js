import express from 'express';
import fetchJson from './helpers/fetch-json.js'


const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

const apiUrl = 'https://fdnd-agency.directus.app/items/',
categorie = await fetchJson (apiUrl + 'deloitte_categories'),
auditSub = await fetchJson (apiUrl + 'deloitte_subcategories?filter[subcategory_id]=1'),
innovationSub = await fetchJson (apiUrl + 'deloitte_subcategories?filter[subcategory_id]=2'),
consultingSub = await fetchJson (apiUrl + 'deloitte_subcategories?filter[subcategory_id]=3');

app.get('/', function(request, response) {
 
    fetchJson(categorie, auditSub, innovationSub, consultingSub)
        response.render('index', {           
            items: categorie.data

        })
    });

app.get('/audit', function(request, response) {
    fetchJson(auditSub)
    response.render('audit.ejs', {
        auditItems: auditSub.data
    });
  });

app.get('/innovation', function(request, response) {
    fetchJson(innovationSub)
    response.render('innovation.ejs', {
        innovationItems: innovationSub.data
    });
  });

app.get('/consulting', function(request, response) {
    fetchJson(consultingSub)
    response.render('consulting.ejs', {
        consultingItems: consultingSub.data
    });
  });

// Stel het poortnummer in waar express naar moet gaan luisteren
app.set('port', process.env.PORT || 8001)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function() {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})