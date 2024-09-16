import {useState} from 'react'
import {Tab, Nav, Col, Row} from 'react-bootstrap'
import MainBackground from "../../components/Main/MainBackground/MainBackground"
import Texts from '../../components/Footers/Politics/Texts'
import style from '../../components/Navigations/NavLinks/NavLink.module.css'

export default function Politics(props){
    const [active, setActive] = useState('terms')
    return(
        <MainBackground titlePage="Regulacje Prawne">
            <Tab.Container id="left-tabs-example" defaultActiveKey="terms" >
                <Row >
                    <Col lg={3} >
                        <Nav variant="pills" className={`flex-column mb-4`}>
                            <Nav.Item >
                                <Nav.Link eventKey="terms"
                                    onClick={ e => setActive('terms')}
                                    className={ active === 'terms' ? `${style.infoLink} ${style.activeLink} shadow-none border-0` : `${style.linkM}`} style={{transition:'none'}}>Regulamin Strony</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="politics" onClick={ e => setActive('politics')}
                                    className={ active === 'politics' ? `${style.infoLink} ${style.activeLink} shadow-none border-0` : `${style.linkM}`} style={{transition:'none'}}>Polityka Prywatności</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="information" onClick={ e => setActive('information')}
                                    className={ active === 'information' ? `${style.infoLink} ${style.activeLink} shadow-none border-0` : `${style.linkM}`} style={{transition:'none'}}>Informacje Prawne</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="politicsCompany" onClick={ e => setActive('politicsCompany')}
                                    className={ active === 'politicsCompany' ? `${style.infoLink} ${style.activeLink} shadow-none border-0` : `${style.linkM}` } style={{transition:'none'}}>Polityka Firmy</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col lg={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="terms">
                                <Texts title='Regulamin Strony'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis est non libero ornare euismod. Vivamus pellentesque, diam ut dapibus ornare, purus ex convallis sapien, vitae vehicula quam eros eget erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque quam mi, mattis id mi quis, vestibulum placerat felis. Ut ante odio, blandit eu metus ac, elementum bibendum magna. Curabitur ex turpis, venenatis et consequat tempus, placerat consequat mauris. Sed velit sapien, elementum sit amet dictum a, finibus vel nisi.
                                </Texts>
                                <Texts>
                                    Curabitur vehicula, lectus eget facilisis dapibus, metus nibh interdum nisi, quis iaculis mauris tortor eget felis. Etiam arcu ante, luctus et quam sed, iaculis dapibus tortor. Proin eu tincidunt mi. Aliquam sit amet nibh iaculis, mattis sem congue, aliquam orci. Mauris et neque ut enim efficitur lobortis sagittis ac arcu. Praesent condimentum, nisi et pharetra auctor, leo dui porttitor sem, vel accumsan libero odio fringilla sapien. Duis feugiat, urna quis fringilla porttitor, odio tortor vehicula lectus, sed dictum elit mauris quis metus. Nunc vel risus lacus. Vivamus elementum interdum ex vel euismod.
                                </Texts>
                                <Texts>
                                    Aenean ut erat ac dolor faucibus molestie vel nec nunc. Vestibulum vitae mauris et nibh euismod ultricies in eu turpis. Integer eget tempus magna, id tincidunt arcu. Proin eu tortor ut lorem mattis lacinia ac eget nulla. Donec viverra mollis quam, sit amet rhoncus metus interdum eu. Nunc a purus luctus odio varius molestie. Donec sed mi justo. Nullam id ex turpis. Donec in risus quis nibh posuere ultricies. Cras volutpat semper quam, vitae eleifend lectus ornare nec.
                                </Texts>
                                <Texts>
                                    Nulla dictum sem odio, nec eleifend libero posuere nec. Vestibulum viverra lorem at dolor posuere porttitor. Duis ut convallis sapien. Phasellus sed sem odio. Suspendisse ultrices, metus eu blandit vestibulum, dolor ante elementum risus, ac viverra sem nibh sed tortor. Phasellus dolor justo, consequat ac bibendum vitae, commodo volutpat dui. Curabitur erat ante, dictum et faucibus non, tempus quis enim. Quisque vestibulum felis quis sem bibendum sollicitudin.
                                </Texts>
                                <Texts>
                                    Mauris eu dolor neque. Pellentesque fringilla ex non nibh pulvinar, non rhoncus eros ultricies. In mauris mauris, pellentesque sagittis sagittis sed, convallis a nunc. Nunc odio augue, maximus sed leo vitae, convallis porttitor nisi. Nam consectetur lacus sapien, a hendrerit neque tristique in. Nullam porta massa quis nibh vestibulum pellentesque. Donec quis venenatis ligula, a tempor metus. Sed eu elit vel est vulputate aliquam non feugiat urna. Vivamus quis arcu vitae odio maximus lobortis quis et est. Suspendisse malesuada, arcu at malesuada venenatis, lectus enim finibus elit, id ultricies sem enim eu orci. In venenatis urna suscipit feugiat tincidunt. Aenean accumsan rutrum dolor at interdum. Cras vel odio vel tortor fermentum rhoncus et ac erat.
                                </Texts>
                            </Tab.Pane>
                            <Tab.Pane eventKey="politics"> 
                                <Texts title='Polityka Prywatności'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis est non libero ornare euismod. Vivamus pellentesque, diam ut dapibus ornare, purus ex convallis sapien, vitae vehicula quam eros eget erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque quam mi, mattis id mi quis, vestibulum placerat felis. Ut ante odio, blandit eu metus ac, elementum bibendum magna. Curabitur ex turpis, venenatis et consequat tempus, placerat consequat mauris. Sed velit sapien, elementum sit amet dictum a, finibus vel nisi.
                                </Texts>
                                <Texts>
                                    Curabitur vehicula, lectus eget facilisis dapibus, metus nibh interdum nisi, quis iaculis mauris tortor eget felis. Etiam arcu ante, luctus et quam sed, iaculis dapibus tortor. Proin eu tincidunt mi. Aliquam sit amet nibh iaculis, mattis sem congue, aliquam orci. Mauris et neque ut enim efficitur lobortis sagittis ac arcu. Praesent condimentum, nisi et pharetra auctor, leo dui porttitor sem, vel accumsan libero odio fringilla sapien. Duis feugiat, urna quis fringilla porttitor, odio tortor vehicula lectus, sed dictum elit mauris quis metus. Nunc vel risus lacus. Vivamus elementum interdum ex vel euismod.
                                </Texts>
                                <Texts>
                                    Aenean ut erat ac dolor faucibus molestie vel nec nunc. Vestibulum vitae mauris et nibh euismod ultricies in eu turpis. Integer eget tempus magna, id tincidunt arcu. Proin eu tortor ut lorem mattis lacinia ac eget nulla. Donec viverra mollis quam, sit amet rhoncus metus interdum eu. Nunc a purus luctus odio varius molestie. Donec sed mi justo. Nullam id ex turpis. Donec in risus quis nibh posuere ultricies. Cras volutpat semper quam, vitae eleifend lectus ornare nec.
                                </Texts>
                                <Texts>
                                    Nulla dictum sem odio, nec eleifend libero posuere nec. Vestibulum viverra lorem at dolor posuere porttitor. Duis ut convallis sapien. Phasellus sed sem odio. Suspendisse ultrices, metus eu blandit vestibulum, dolor ante elementum risus, ac viverra sem nibh sed tortor. Phasellus dolor justo, consequat ac bibendum vitae, commodo volutpat dui. Curabitur erat ante, dictum et faucibus non, tempus quis enim. Quisque vestibulum felis quis sem bibendum sollicitudin.
                                </Texts>
                                <Texts>
                                    Mauris eu dolor neque. Pellentesque fringilla ex non nibh pulvinar, non rhoncus eros ultricies. In mauris mauris, pellentesque sagittis sagittis sed, convallis a nunc. Nunc odio augue, maximus sed leo vitae, convallis porttitor nisi. Nam consectetur lacus sapien, a hendrerit neque tristique in. Nullam porta massa quis nibh vestibulum pellentesque. Donec quis venenatis ligula, a tempor metus. Sed eu elit vel est vulputate aliquam non feugiat urna. Vivamus quis arcu vitae odio maximus lobortis quis et est. Suspendisse malesuada, arcu at malesuada venenatis, lectus enim finibus elit, id ultricies sem enim eu orci. In venenatis urna suscipit feugiat tincidunt. Aenean accumsan rutrum dolor at interdum. Cras vel odio vel tortor fermentum rhoncus et ac erat.
                                </Texts>
                            </Tab.Pane>
                            <Tab.Pane eventKey="information">
                                <Texts title='Informacje Prawne'>
                                    Nulla sodales blandit risus vel molestie. Vestibulum interdum faucibus velit sed rhoncus. Aenean non eleifend turpis, non porttitor odio. Morbi eu lacinia elit. Morbi vel neque et dui sagittis pellentesque et ac tortor. Cras lectus nunc, ultricies eu aliquam eget, hendrerit quis mi. Nulla sagittis justo ac elit interdum tempor. Aenean laoreet quis ligula a rhoncus. Phasellus neque quam, imperdiet non purus sed, porta consectetur mauris. Nullam viverra, enim sed convallis facilisis, magna justo feugiat lorem, eu gravida urna diam sit amet lorem. Etiam mollis pharetra ipsum non tempor.
                                </Texts>
                                <Texts>
                                    Vivamus tristique elementum augue quis auctor. Nam tempus lacus vel nibh gravida faucibus quis id dolor. Phasellus pulvinar nulla mi, vitae rutrum leo posuere in. Nam commodo magna velit, sed molestie sem posuere id. Vestibulum malesuada nibh a elit facilisis vulputate. Quisque dolor ex, eleifend eu vehicula non, bibendum vel ex. Aliquam fermentum neque vel mauris semper consequat. Cras aliquam est a dictum facilisis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus elementum tempus leo, ac rutrum enim porta eu. Suspendisse id ultrices risus. Nulla in risus eget orci sodales sagittis.
                                </Texts>
                                <Texts>
                                    Quisque vel diam vitae justo egestas faucibus. Nunc id odio venenatis, sodales felis in, facilisis lorem. Ut ullamcorper magna vitae porttitor vestibulum. Nunc vel nisi sed nunc dictum euismod ut pretium odio. Nullam tellus erat, venenatis in euismod porttitor, hendrerit nec leo. Suspendisse a mauris massa. Aenean sollicitudin, risus vel commodo finibus, ipsum tellus venenatis sem, sed iaculis purus ex vitae nisl. Vestibulum facilisis sem rutrum nulla luctus, in molestie ligula ullamcorper. Mauris vulputate eros ac imperdiet gravida. Ut et efficitur leo.
                                </Texts>
                                <Texts>
                                    Nulla viverra nulla tortor, at ultrices leo bibendum ut. Maecenas bibendum interdum risus ut cursus. Vivamus vulputate urna in dictum tincidunt. Sed cursus tristique nulla non finibus. Morbi in diam dapibus, rhoncus nisl elementum, fringilla eros. Nam eu urna eu augue suscipit sagittis. Donec sollicitudin et nisl et euismod. Aliquam nunc nibh, consectetur id est vel, dignissim malesuada urna. Nam nisl tellus, porta cursus enim in, egestas gravida sem. Donec semper sapien a scelerisque bibendum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce tellus neque, interdum aliquam risus quis, ullamcorper porta mi. Pellentesque et elementum eros. Vestibulum fringilla cursus lacus. Nunc vitae augue magna. Donec rhoncus auctor tristique.
                                </Texts>
                                <Texts>
                                    Sed nulla urna, faucibus in lacus et, pulvinar vehicula libero. Vivamus gravida elit id arcu maximus suscipit sit amet a ante. Suspendisse et nisi at nibh semper suscipit id ac nulla. Vivamus magna mi, tempor lobortis egestas condimentum, semper sed nunc. Nunc semper egestas leo, a suscipit tortor feugiat convallis. Ut maximus ac nisi nec efficitur. Curabitur dignissim rhoncus leo vitae eleifend. Morbi dui erat, pellentesque vehicula egestas vestibulum, pretium sit amet odio. Sed semper, dolor imperdiet pharetra placerat, quam velit pellentesque eros, eu molestie turpis dui in arcu. Praesent lacinia dolor in urna ultricies ornare. Morbi ut suscipit risus. Aliquam ut maximus odio. Curabitur a aliquet leo, in pellentesque erat. Integer non pellentesque sem. Duis cursus pretium est, ullamcorper rhoncus nibh fringilla non. Fusce malesuada varius quam eu consequat.
                                </Texts>
                            </Tab.Pane>
                            <Tab.Pane eventKey="politicsCompany">
                                <Texts title='Polityka Firmy'>
                                    In sit amet varius erat, id tincidunt eros. Quisque vel eleifend sem, et efficitur dolor. Etiam sed est nulla. Vivamus non tincidunt felis. Duis condimentum arcu eget risus hendrerit, id ultrices diam euismod. Nunc vitae arcu nibh. Curabitur maximus felis ac risus laoreet efficitur. Sed vitae molestie nisi. Vestibulum convallis pretium augue non dignissim. Vestibulum sit amet purus vitae odio accumsan lacinia. Sed vestibulum felis tortor, cursus euismod ante porta quis.
                                </Texts>
                                <Texts>
                                    Phasellus pulvinar ultrices felis, et viverra turpis volutpat et. Duis ullamcorper elit nec lacinia eleifend. Integer rhoncus pretium diam et fermentum. Mauris massa tortor, vulputate et enim nec, gravida vehicula ex. Nulla consectetur erat commodo neque hendrerit, et consequat est fringilla. Vestibulum scelerisque lacinia felis eget lobortis. Vivamus neque sem, fringilla commodo velit a, sodales egestas velit. Curabitur bibendum ipsum in bibendum sollicitudin. Donec fringilla enim vitae nibh faucibus suscipit.
                                </Texts>
                                <Texts>
                                    Aliquam nunc ex, sagittis sed arcu et, tincidunt egestas ante. Nullam interdum pharetra nulla ac laoreet. Praesent laoreet sagittis nibh, rhoncus lacinia mauris viverra ac. Quisque sem erat, mattis vel risus ut, iaculis pellentesque odio. Donec suscipit erat et porttitor placerat. Duis aliquam, arcu scelerisque rhoncus pellentesque, leo tortor viverra sapien, sed convallis urna lorem eget odio. Duis ultricies id erat vel accumsan. Suspendisse potenti. Vestibulum a iaculis nulla, at commodo felis. Integer hendrerit lorem ante, quis lacinia ex eleifend ut. Phasellus sit amet tortor id nulla tempus sollicitudin. Maecenas posuere scelerisque justo, sit amet tincidunt justo blandit non. Duis et ultricies metus, eu feugiat nunc. Proin vitae porttitor eros, in pellentesque sapien. Donec mattis risus eget laoreet rhoncus. Integer fermentum urna ut risus interdum, in egestas mi egestas.
                                </Texts>
                                <Texts>
                                    Integer sodales ipsum in dui blandit pharetra. Praesent massa nisi, gravida et felis at, dictum feugiat arcu. Proin bibendum ornare viverra. Pellentesque semper erat gravida, suscipit neque in, volutpat libero. Phasellus posuere dui sed augue aliquam sodales. Donec egestas tellus ac arcu iaculis, non fringilla nunc porta. Nam at tortor vitae nunc molestie porttitor in quis nisi. Ut turpis leo, ullamcorper ac suscipit quis, euismod eget diam. Curabitur nisl justo, faucibus at arcu ac, porta volutpat lacus. Donec vehicula egestas urna, eget pharetra libero consectetur sit amet.
                                </Texts>
                                <Texts>
                                    Ut quis quam a dui ultrices pretium. Nullam at erat lorem. Nulla tempus tellus quis euismod semper. Aenean tristique imperdiet diam eu rutrum. Ut semper odio augue, ac iaculis justo bibendum ut. Suspendisse nisi nisi, porttitor nec sagittis ac, convallis a risus. In nec laoreet felis, eu molestie mauris. Fusce pretium hendrerit euismod. In mattis nisi vitae enim pellentesque, nec euismod quam efficitur. Aliquam bibendum purus ac orci consectetur, at malesuada arcu eleifend. Aliquam eu mauris sem. Phasellus eu sodales ipsum. Suspendisse semper tincidunt lectus eu semper. Sed blandit sed leo at rhoncus.
                                </Texts>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </MainBackground>
    )
}