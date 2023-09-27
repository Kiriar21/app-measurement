import MainBackground from "../../../../components/Main/MainBackground/MainBackground"
import TableBody from "../../../../components/Main/Forms/ActuallyMeasurement/AmStatistics/TableBodyStatistic"
import H3Module from '../../../../components/Main/Texts/H3Module/H3Module'
export default function Login(props){
    const theader = ['Nazwa klasyfikacji', 'Dystans(KM)', 'Liczba osób startujących', 'Liczba osób na mecie', 'Pozostało', 'Liczba kobiet startujących', 'Liczba kobiet na mecie', 'Pozostało kobiet', 'Liczba mężczyzn startujących', 'Liczba mężczyzn na mecie', 'Pozostało mężczyzn'       ]
    const tbody = [{
        name:'Krótka nazwa',
        distance:'5KM',
        runners:100,
        onMeta:1,
        leftMeta:99,
        womenStart:50,
        womenMeta:1,
        womenLeft:49,
        menStart:50,
        menMeta:0,
        menLeft:50
    },{
        name:'Bardzo długa nazwa',
        distance:'10KM',
        runners:100,
        onMeta:1,
        leftMeta:99,
        womenStart:50,
        womenMeta:1,
        womenLeft:49,
        menStart:50,
        menMeta:0,
        menLeft:50
    }]
    return(
        <MainBackground titlePage="Statystyki">
            <H3Module title='Bieg na czas'/>
            <TableBody theader={theader} tbody={tbody} />
            {/* <H3Module title='Brak informacji o statystkach. 
            Dodaj plik z danymi zawodników, żeby pojawiły się statystyki.' /> */}
        </MainBackground>
    )
}