import { useState, useEffect, useCallback } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import Select from '../../Selects/SelectMeasurement/SelectMeasurement'
import ButtonForm from "../../../../Buttons/ButtonForm/ButtonForm"
import SortsModule from "../../SortsModule/SortsModule"
import SearchModule from "../../SearchModule/SearchModule"
import TableBody from "./TableBody"
import axios from 'axios'
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

export default function FormScores(props){
    
    const {id} = useParams();
    //Pobieranie danych z bazy 
    const [downloadingResults, setDownloadingResults] = useState(false);

    //Status do wyswietlenia sie w przypadku problemów
    const [status, setStatus] = useState('Ładowanie danych...')
    
    //Pobieranie klasyfikacji
    const [classificationsNames, setClassificationsNames] = useState([])
    //Pobieranie indexu klasyfikacji
    const [selectedClassificationIndex, setSelectedClassificationIndex] = useState(0);

    //Pobieranie kategorii z danej klasyfikacji
    const [categories, setCategories] = useState([]);

    //Pobieranie wybranego typu kategorii do wyswietlenia
    const [selectedCategory, setSelectedCategory] = useState('open');
    


    const [searchBar,setSearchBar] = useState('');;
    const [filtrSex,setfiltrSex] = useState(''); 
    const [filtrStatus,setfiltrStatus] = useState('');

    //Pobieranie uczestników z danej kategorii
    const [participantsData, setParticipantsData] = useState([]);

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    //Pobieranie uczestników z danej kategorii
    useEffect(() => {
        const getParticipantsData = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/api/event/${id}/classifications/${selectedClassificationIndex}/participants/${selectedCategory}`, {
                    params: {
                        search: searchBar,
                        genderFilter: filtrSex,
                        statusFilter: filtrStatus,
                    }
                });
        
                if (res.status >= 200 && res.status < 300) {
                    setParticipantsData(res.data);
                    setStatus('');
                }
            } catch (error) {
                console.log(error);
                setStatus('Błąd ładowania danych uczestników.');
            }
        };
    
        if (selectedCategory) {
            getParticipantsData();
        }
    
    }, [id, selectedClassificationIndex, selectedCategory, searchBar, filtrSex, filtrStatus]);
    
    const cleanSets = () => {
        setSearchBar('');
        setfiltrSex('');
        setfiltrStatus('');
        setStatus('Ładowanie danych...')
    }


    //Pobieranie kategorie z danej klasyfikacji do selecta ludzi
    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/api/event/${id}/classifications/${selectedClassificationIndex}/categories`);
    
                if (res.status >= 200 && res.status < 300) {
                    const categoriesData = res.data;
                    // Dodajemy opcje 'Open' i 'Dekoracja' na początku
                    const categoriesWithDefaults = [
                        { title: 'Open', name: 'open' },
                        { title: 'Dekoracja', name: 'decoration' },
                        ...categoriesData
                    ];
                    setCategories(categoriesWithDefaults);
                    setStatus('');
                }
            } catch (error) {
                console.log(error);
                setStatus('Błąd ładowania kategorii.');
            }
        };
    
        if (classificationsNames.length > 0) {
            getCategories();
        }
    
    }, [id, selectedClassificationIndex, classificationsNames]);
    
    const exportToPDF = async () => {
        if (participantsData.length === 0) {
          alert('Brak danych do eksportu');
          return;
        }
      
        const getCurrentFormattedDate = (pdf) => {
            const now = new Date();
            const pad = (num) => String(num).padStart(2, '0');
            const day = pad(now.getDate());
            const month = pad(now.getMonth() + 1); // Miesiące są indeksowane od 0
            const year = now.getFullYear();
            const hours = pad(now.getHours());
            const minutes = pad(now.getMinutes());
            const seconds = pad(now.getSeconds());
            if(pdf)
            {
                return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
            }
            return `${day}-${month}-${year}_${hours}-${minutes}-${seconds}`;
          };

        const companyName = "Nazwa Firmy";
        const classificationName = classificationsNames[selectedClassificationIndex]?.title || 'Klasyfikacja';
        const selectedCategoryTitle = categories.find(cat => cat.name === selectedCategory)?.title || 'Kategoria';
        const isDecoration = selectedCategory === 'decoration';
      
        const docDefinition = {
            content: [],
            defaultStyle: {
              font: 'Roboto', // Use the default Roboto font
              alignment: 'center' // Wyśrodkowanie wszystkich elementów
            },
            styles: {
              header: {
                fontSize: 16,
                bold: true,
                alignment: 'center',
                margin: [0, 10, 0, 5]
              },
              subheader: {
                fontSize: 12,
                alignment: 'center',
                margin: [0, 0, 0, 5]
              },
              tableHeader: {
                bold: true,
                fillColor: '#16A085',
                color: 'white',
                alignment: 'center'
              },
              tableCell: {
                alignment: 'center'
              },
              footer: {
                fontSize: 10,
                alignment: 'center'
              }
            },
            header: function(currentPage, pageCount) {
              return {
                stack: [
                  { text: "Wyniki opracowane przez: " + companyName, style: 'header' },
                  { text: "Klasyfikacja: " + classificationName + " Typ wyników: " + selectedCategoryTitle, style: 'subheader' },
                  { text: "Data i godzina: " + getCurrentFormattedDate(true), style: 'subheader' }
                ],
                margin: [0, 10, 0, 10]
              };
            },
            footer: function (currentPage, pageCount) {
              return {
                text: 'Strona ' + currentPage.toString() + ' z ' + pageCount,
                style: 'footer'
              };
            },
            pageMargins: [40, 100, 40, 60] // Zwiększenie górnych marginesów, aby nagłówek się nie nakładał
          };
          
      
        const tableLayout = {
          fillColor: function (rowIndex, node, columnIndex) {
            if (rowIndex === 0) {
              return '#16A085'; // Nagłówek tabeli
            }
            // Zmiana koloru co drugiego wiersza (począwszy od wiersza 1, bo wiersz 0 to nagłówek)
            return (rowIndex % 2 === 0) ? '#f2f2f2' : null;
          },
          hLineWidth: function () { return 0.5; },
          vLineWidth: function () { return 0.5; },
          hLineColor: function () { return '#aaa'; },
          vLineColor: function () { return '#aaa'; },
          paddingLeft: function () { return 5; },
          paddingRight: function () { return 5; },
          paddingTop: function () { return 2; },
          paddingBottom: function () { return 2; }
        };
      
        if (isDecoration) {
          participantsData.forEach((group, index) => {
            const tableBody = [];
      
            // Nagłówek tabeli
            tableBody.push([
              { text: 'Nr', style: 'tableHeader' },
              { text: 'OPEN', style: 'tableHeader' },
              { text: 'M/K', style: 'tableHeader' },
              { text: 'Kat Wiek', style: 'tableHeader' },
              { text: 'Zawodnik', style: 'tableHeader' },
              { text: 'Klasyfikacja', style: 'tableHeader' },
              { text: 'Kategoria', style: 'tableHeader' },
              { text: 'Czas brutto', style: 'tableHeader' },
            ]);
      
            group.data.forEach(participant => {
              tableBody.push([
                { text: participant['Nr'] || '', style: 'tableCell' },
                { text: participant['Miejsce OPEN'] || '', style: 'tableCell' },
                { text: participant['Miejsce Plec'] || '', style: 'tableCell' },
                { text: participant['Miejsce Kat Wiek'] || '', style: 'tableCell' },
                { text: participant['Zawodnik'] || '', style: 'tableCell' },
                { text: participant['Klasyfikacja'] || '', style: 'tableCell' },
                { text: participant['Kategoria'] || '', style: 'tableCell' },
                { text: participant['Czas brutto'] || '', style: 'tableCell' },
              ]);
            });
      
            if (index !== 0) {
              docDefinition.content.push({ text: '', pageBreak: 'before' });
            }
      
            docDefinition.content.push(
              { text: group.group, style: 'header', margin: [0, 0, 0, 10] },
              {
                table: {
                  headerRows: 1,
                  widths: ['auto', 'auto', 'auto', 'auto', '*', 'auto', 'auto', 'auto'],
                  body: tableBody
                },
                layout: tableLayout
              }
            );
          });
        } else {
          const tableBody = [];
      
          // Nagłówek tabeli
          tableBody.push([
            { text: 'Nr', style: 'tableHeader' },
            { text: 'OPEN', style: 'tableHeader' },
            { text: 'M/K', style: 'tableHeader' },
            { text: 'Kat Wiek', style: 'tableHeader' },
            { text: 'Zawodnik', style: 'tableHeader' },
            { text: 'Klasyfikacja', style: 'tableHeader' },
            { text: 'Kategoria', style: 'tableHeader' },
            { text: 'Czas brutto', style: 'tableHeader' },
          ]);
      
          participantsData.forEach(participant => {
            tableBody.push([
              { text: participant['Nr'] || '', style: 'tableCell' },
              { text: participant['Miejsce OPEN'] || '', style: 'tableCell' },
              { text: participant['Miejsce Plec'] || '', style: 'tableCell' },
              { text: participant['Miejsce Kat Wiek'] || '', style: 'tableCell' },
              { text: participant['Zawodnik'] || '', style: 'tableCell' },
              { text: participant['Klasyfikacja'] || '', style: 'tableCell' },
              { text: participant['Kategoria'] || '', style: 'tableCell' },
              { text: participant['Czas brutto'] || '', style: 'tableCell' },
            ]);
          });
      
          docDefinition.content.push(
            {
              table: {
                headerRows: 1,
                widths: ['auto', 'auto', 'auto', 'auto', '*', 'auto', 'auto', 'auto'],
                body: tableBody
              },
              layout: tableLayout
            }
          );
        }
      
        let fileName = `wyniki-${selectedCategoryTitle}-${classificationName}-${getCurrentFormattedDate()}.pdf`;
      
        // Zamiana spacji i polskich znaków w nazwie pliku
        fileName = fileName.replace(/\s+/g, '_').replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, function (match) {
          const map = {
            'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n',
            'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
            'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N',
            'Ó': 'O', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z'
          };
          return map[match];
        });
      
        pdfMake.createPdf(docDefinition).download(fileName);
      };
    
    



    //Pobieranie klasyfikacji z endpointu
    const getClassificationsNames = useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:5001/api/event/${id}/classifications`)
            
            if(res.status >= 200 && res.status < 300) {
                setClassificationsNames(res.data)
                setStatus('')
            }

        } catch (error) {
            console.log(error)
            setStatus('Błąd ładowania danych.')
        }
    }, [id])

    //Wywolywanie funkcji pobierania klasyfikacji
    useEffect(() => {
        getClassificationsNames()
    }, [getClassificationsNames])


    //Funkcja od pobierania wyników
    useEffect(() => {
        let isMounted = true;
        let timeoutId;
    
        const fetchData = async () => {
            if (!isMounted || !downloadingResults) return;
    
            try {
                const result = await axios.get(`http://localhost:5001/api/event/${id}/classifications/updateData`);
    
                if (result.status === 200 && result.data.isUpdatedFinished === true) {
                    if (isMounted && downloadingResults) {
                        timeoutId = setTimeout(fetchData, 2000);
                    }
                } else {
                    setDownloadingResults(false);
                    isMounted = false;
                    return;
                }
    
            } catch (error) {
                console.error(error);
                setDownloadingResults(false);  
                isMounted = false;
                return;
            }
        };
    
        if (downloadingResults) {
            fetchData();
        }
    
        return () => {
            isMounted = false;
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [downloadingResults, id]);

    const theader=['Nr','Miejsce OPEN','Miejsce Plec','Miejsce Kat Wiek','Zawodnik','Klasyfikacja','Kategoria','Czas Netto','Czas brutto','Srednia Predkosc','Srednie Tempo','Strata','Plec','Wiek','Kraj','Miasto','Klub', 'Status']

    return (
        <Container fluid>
        { classificationsNames.length > 0 ? (
            <>
                <Row>
                    <Col lg={6} className="d-flex">
                        <ButtonForm className='mx-2' buttonTitle='Exportuj Wyniki' onClick={exportToPDF}/>
                        <ButtonForm
                            className='mx-2'
                            buttonTitle={downloadingResults ? 'Przestań pobierać wyniki' : 'Pobieraj Wyniki'}
                            colorBtn={downloadingResults ? 'red' : 'green'}
                            onClick={() => setDownloadingResults(!downloadingResults)}
                        />
                    </Col>
                    <Form className={`m-3`}>
                        <Col lg={4}>
                            <Select controlId='selectClass'
                                    labelText='Wybierz Klasyfikacje'
                                    onChange={e => setSelectedClassificationIndex(parseInt(e.target.value))}
                                    opt={classificationsNames}
                                    value={selectedClassificationIndex}
                                    lg={12} />
                        </Col>
                        <Col lg={4}>
                            <Select controlId='selectCategory'
                                    labelText='Wybierz Kategorie'
                                    onChange={e => setSelectedCategory(e.target.value)}
                                    opt={categories}
                                    value={selectedCategory}
                                    lg={12} />
                        </Col>
                    </Form>
                </Row>
                <Form className={`m-3`}>
                    <SortsModule filtrSex={e => setfiltrSex(e.target.value)} filtrStatus={e => setfiltrStatus(e.target.value)} />
                    <SearchModule controlId='sbcompetitors' labelText='Szukaj zawodnika (Imie / Nazwisko / Numer)'  onChange={e=>{setSearchBar(e.target.value)}} placeholder="Szuka zawodnika po imieniu, nazwisku lub numerze" turnOffDate={true} onClear={cleanSets} />
                    <TableBody theader={theader} tbody={participantsData}/>
                </Form>
            </>
        ) : (
            <h1>{status}</h1>
        )
        }
        </Container>
    )
}