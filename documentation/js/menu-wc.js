'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">backend-api documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-6bd38e40a762934b950743a4b540f25160e2b774a161b183914e3192e8913879a7e55f304ae60fdd95c4d6322e9f92ee5200a938639b91c794f4c8a66847d3e0"' : 'data-bs-target="#xs-controllers-links-module-AppModule-6bd38e40a762934b950743a4b540f25160e2b774a161b183914e3192e8913879a7e55f304ae60fdd95c4d6322e9f92ee5200a938639b91c794f4c8a66847d3e0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-6bd38e40a762934b950743a4b540f25160e2b774a161b183914e3192e8913879a7e55f304ae60fdd95c4d6322e9f92ee5200a938639b91c794f4c8a66847d3e0"' :
                                            'id="xs-controllers-links-module-AppModule-6bd38e40a762934b950743a4b540f25160e2b774a161b183914e3192e8913879a7e55f304ae60fdd95c4d6322e9f92ee5200a938639b91c794f4c8a66847d3e0"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-6bd38e40a762934b950743a4b540f25160e2b774a161b183914e3192e8913879a7e55f304ae60fdd95c4d6322e9f92ee5200a938639b91c794f4c8a66847d3e0"' : 'data-bs-target="#xs-injectables-links-module-AppModule-6bd38e40a762934b950743a4b540f25160e2b774a161b183914e3192e8913879a7e55f304ae60fdd95c4d6322e9f92ee5200a938639b91c794f4c8a66847d3e0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-6bd38e40a762934b950743a4b540f25160e2b774a161b183914e3192e8913879a7e55f304ae60fdd95c4d6322e9f92ee5200a938639b91c794f4c8a66847d3e0"' :
                                        'id="xs-injectables-links-module-AppModule-6bd38e40a762934b950743a4b540f25160e2b774a161b183914e3192e8913879a7e55f304ae60fdd95c4d6322e9f92ee5200a938639b91c794f4c8a66847d3e0"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-1e6253f46cb1fef0339cdffffd62b2add4fd36b2e45fdfb6d19af8cabe295b2a7b5f8ee04a5776703aa478a90c64270480218c552e91408bf12bd7da8417d205"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-1e6253f46cb1fef0339cdffffd62b2add4fd36b2e45fdfb6d19af8cabe295b2a7b5f8ee04a5776703aa478a90c64270480218c552e91408bf12bd7da8417d205"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-1e6253f46cb1fef0339cdffffd62b2add4fd36b2e45fdfb6d19af8cabe295b2a7b5f8ee04a5776703aa478a90c64270480218c552e91408bf12bd7da8417d205"' :
                                            'id="xs-controllers-links-module-AuthModule-1e6253f46cb1fef0339cdffffd62b2add4fd36b2e45fdfb6d19af8cabe295b2a7b5f8ee04a5776703aa478a90c64270480218c552e91408bf12bd7da8417d205"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-1e6253f46cb1fef0339cdffffd62b2add4fd36b2e45fdfb6d19af8cabe295b2a7b5f8ee04a5776703aa478a90c64270480218c552e91408bf12bd7da8417d205"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-1e6253f46cb1fef0339cdffffd62b2add4fd36b2e45fdfb6d19af8cabe295b2a7b5f8ee04a5776703aa478a90c64270480218c552e91408bf12bd7da8417d205"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-1e6253f46cb1fef0339cdffffd62b2add4fd36b2e45fdfb6d19af8cabe295b2a7b5f8ee04a5776703aa478a90c64270480218c552e91408bf12bd7da8417d205"' :
                                        'id="xs-injectables-links-module-AuthModule-1e6253f46cb1fef0339cdffffd62b2add4fd36b2e45fdfb6d19af8cabe295b2a7b5f8ee04a5776703aa478a90c64270480218c552e91408bf12bd7da8417d205"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link" >ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProductsModule-c40baa1be309d504f36c5ab88fb5923b382f4936340014090a92d3a252f39ecc73f8eaa603b98a0dd6e241baee6a95f6a05f649663edbbc14d0524a5bdb20878"' : 'data-bs-target="#xs-controllers-links-module-ProductsModule-c40baa1be309d504f36c5ab88fb5923b382f4936340014090a92d3a252f39ecc73f8eaa603b98a0dd6e241baee6a95f6a05f649663edbbc14d0524a5bdb20878"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductsModule-c40baa1be309d504f36c5ab88fb5923b382f4936340014090a92d3a252f39ecc73f8eaa603b98a0dd6e241baee6a95f6a05f649663edbbc14d0524a5bdb20878"' :
                                            'id="xs-controllers-links-module-ProductsModule-c40baa1be309d504f36c5ab88fb5923b382f4936340014090a92d3a252f39ecc73f8eaa603b98a0dd6e241baee6a95f6a05f649663edbbc14d0524a5bdb20878"' }>
                                            <li class="link">
                                                <a href="controllers/ProductsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductsModule-c40baa1be309d504f36c5ab88fb5923b382f4936340014090a92d3a252f39ecc73f8eaa603b98a0dd6e241baee6a95f6a05f649663edbbc14d0524a5bdb20878"' : 'data-bs-target="#xs-injectables-links-module-ProductsModule-c40baa1be309d504f36c5ab88fb5923b382f4936340014090a92d3a252f39ecc73f8eaa603b98a0dd6e241baee6a95f6a05f649663edbbc14d0524a5bdb20878"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductsModule-c40baa1be309d504f36c5ab88fb5923b382f4936340014090a92d3a252f39ecc73f8eaa603b98a0dd6e241baee6a95f6a05f649663edbbc14d0524a5bdb20878"' :
                                        'id="xs-injectables-links-module-ProductsModule-c40baa1be309d504f36c5ab88fb5923b382f4936340014090a92d3a252f39ecc73f8eaa603b98a0dd6e241baee6a95f6a05f649663edbbc14d0524a5bdb20878"' }>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-5a3b7f30608a49dcfb83d9d03f1314616b7307420ae8225d36a481d7e5ccd2248c5e53f35b6cee5020fb845c59b4564576eb749b109315724b5fc7456c0af90f"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-5a3b7f30608a49dcfb83d9d03f1314616b7307420ae8225d36a481d7e5ccd2248c5e53f35b6cee5020fb845c59b4564576eb749b109315724b5fc7456c0af90f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-5a3b7f30608a49dcfb83d9d03f1314616b7307420ae8225d36a481d7e5ccd2248c5e53f35b6cee5020fb845c59b4564576eb749b109315724b5fc7456c0af90f"' :
                                            'id="xs-controllers-links-module-UsersModule-5a3b7f30608a49dcfb83d9d03f1314616b7307420ae8225d36a481d7e5ccd2248c5e53f35b6cee5020fb845c59b4564576eb749b109315724b5fc7456c0af90f"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-5a3b7f30608a49dcfb83d9d03f1314616b7307420ae8225d36a481d7e5ccd2248c5e53f35b6cee5020fb845c59b4564576eb749b109315724b5fc7456c0af90f"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-5a3b7f30608a49dcfb83d9d03f1314616b7307420ae8225d36a481d7e5ccd2248c5e53f35b6cee5020fb845c59b4564576eb749b109315724b5fc7456c0af90f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-5a3b7f30608a49dcfb83d9d03f1314616b7307420ae8225d36a481d7e5ccd2248c5e53f35b6cee5020fb845c59b4564576eb749b109315724b5fc7456c0af90f"' :
                                        'id="xs-injectables-links-module-UsersModule-5a3b7f30608a49dcfb83d9d03f1314616b7307420ae8225d36a481d7e5ccd2248c5e53f35b6cee5020fb845c59b4564576eb749b109315724b5fc7456c0af90f"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProductsController.html" data-type="entity-link" >ProductsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductsService.html" data-type="entity-link" >ProductsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});