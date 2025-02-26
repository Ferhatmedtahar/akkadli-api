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
                                <a href="modules/AddressModule.html" data-type="entity-link" >AddressModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AddressModule-d9da6dc5917ab7c060d4a44c74515ad82ec9b1cc46fce08a5281c148a2a1e4b008289098d0318583006c563763095cc700bab3717a037133162f90221123e24e"' : 'data-bs-target="#xs-controllers-links-module-AddressModule-d9da6dc5917ab7c060d4a44c74515ad82ec9b1cc46fce08a5281c148a2a1e4b008289098d0318583006c563763095cc700bab3717a037133162f90221123e24e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AddressModule-d9da6dc5917ab7c060d4a44c74515ad82ec9b1cc46fce08a5281c148a2a1e4b008289098d0318583006c563763095cc700bab3717a037133162f90221123e24e"' :
                                            'id="xs-controllers-links-module-AddressModule-d9da6dc5917ab7c060d4a44c74515ad82ec9b1cc46fce08a5281c148a2a1e4b008289098d0318583006c563763095cc700bab3717a037133162f90221123e24e"' }>
                                            <li class="link">
                                                <a href="controllers/AddressController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddressController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AddressModule-d9da6dc5917ab7c060d4a44c74515ad82ec9b1cc46fce08a5281c148a2a1e4b008289098d0318583006c563763095cc700bab3717a037133162f90221123e24e"' : 'data-bs-target="#xs-injectables-links-module-AddressModule-d9da6dc5917ab7c060d4a44c74515ad82ec9b1cc46fce08a5281c148a2a1e4b008289098d0318583006c563763095cc700bab3717a037133162f90221123e24e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AddressModule-d9da6dc5917ab7c060d4a44c74515ad82ec9b1cc46fce08a5281c148a2a1e4b008289098d0318583006c563763095cc700bab3717a037133162f90221123e24e"' :
                                        'id="xs-injectables-links-module-AddressModule-d9da6dc5917ab7c060d4a44c74515ad82ec9b1cc46fce08a5281c148a2a1e4b008289098d0318583006c563763095cc700bab3717a037133162f90221123e24e"' }>
                                        <li class="link">
                                            <a href="injectables/AddressService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddressService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CreateAddressProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateAddressProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GetAddressProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GetAddressProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PatchAddressProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PatchAddressProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-25980f1a0ba4cbf6a45719dd62d7a1c477545bdf5122d1a04eaed8e224a35d7b66b46d78ebb331dd20358e870cd3b4b19e7562f4ce2f66a97089093492d804f6"' : 'data-bs-target="#xs-controllers-links-module-AppModule-25980f1a0ba4cbf6a45719dd62d7a1c477545bdf5122d1a04eaed8e224a35d7b66b46d78ebb331dd20358e870cd3b4b19e7562f4ce2f66a97089093492d804f6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-25980f1a0ba4cbf6a45719dd62d7a1c477545bdf5122d1a04eaed8e224a35d7b66b46d78ebb331dd20358e870cd3b4b19e7562f4ce2f66a97089093492d804f6"' :
                                            'id="xs-controllers-links-module-AppModule-25980f1a0ba4cbf6a45719dd62d7a1c477545bdf5122d1a04eaed8e224a35d7b66b46d78ebb331dd20358e870cd3b4b19e7562f4ce2f66a97089093492d804f6"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-25980f1a0ba4cbf6a45719dd62d7a1c477545bdf5122d1a04eaed8e224a35d7b66b46d78ebb331dd20358e870cd3b4b19e7562f4ce2f66a97089093492d804f6"' : 'data-bs-target="#xs-injectables-links-module-AppModule-25980f1a0ba4cbf6a45719dd62d7a1c477545bdf5122d1a04eaed8e224a35d7b66b46d78ebb331dd20358e870cd3b4b19e7562f4ce2f66a97089093492d804f6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-25980f1a0ba4cbf6a45719dd62d7a1c477545bdf5122d1a04eaed8e224a35d7b66b46d78ebb331dd20358e870cd3b4b19e7562f4ce2f66a97089093492d804f6"' :
                                        'id="xs-injectables-links-module-AppModule-25980f1a0ba4cbf6a45719dd62d7a1c477545bdf5122d1a04eaed8e224a35d7b66b46d78ebb331dd20358e870cd3b4b19e7562f4ce2f66a97089093492d804f6"' }>
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
                                <a href="modules/DeliveriesModule.html" data-type="entity-link" >DeliveriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DeliveriesModule-4e6b94b77bd02f3c4c80378867c56ffefa6458c60c4345192234f0bd049c1c4964af94dc3f466cac9a1d8d47ab0dd0c4b24569cc758864c3c289969859a24876"' : 'data-bs-target="#xs-controllers-links-module-DeliveriesModule-4e6b94b77bd02f3c4c80378867c56ffefa6458c60c4345192234f0bd049c1c4964af94dc3f466cac9a1d8d47ab0dd0c4b24569cc758864c3c289969859a24876"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DeliveriesModule-4e6b94b77bd02f3c4c80378867c56ffefa6458c60c4345192234f0bd049c1c4964af94dc3f466cac9a1d8d47ab0dd0c4b24569cc758864c3c289969859a24876"' :
                                            'id="xs-controllers-links-module-DeliveriesModule-4e6b94b77bd02f3c4c80378867c56ffefa6458c60c4345192234f0bd049c1c4964af94dc3f466cac9a1d8d47ab0dd0c4b24569cc758864c3c289969859a24876"' }>
                                            <li class="link">
                                                <a href="controllers/DeliveriesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeliveriesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DeliveriesModule-4e6b94b77bd02f3c4c80378867c56ffefa6458c60c4345192234f0bd049c1c4964af94dc3f466cac9a1d8d47ab0dd0c4b24569cc758864c3c289969859a24876"' : 'data-bs-target="#xs-injectables-links-module-DeliveriesModule-4e6b94b77bd02f3c4c80378867c56ffefa6458c60c4345192234f0bd049c1c4964af94dc3f466cac9a1d8d47ab0dd0c4b24569cc758864c3c289969859a24876"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DeliveriesModule-4e6b94b77bd02f3c4c80378867c56ffefa6458c60c4345192234f0bd049c1c4964af94dc3f466cac9a1d8d47ab0dd0c4b24569cc758864c3c289969859a24876"' :
                                        'id="xs-injectables-links-module-DeliveriesModule-4e6b94b77bd02f3c4c80378867c56ffefa6458c60c4345192234f0bd049c1c4964af94dc3f466cac9a1d8d47ab0dd0c4b24569cc758864c3c289969859a24876"' }>
                                        <li class="link">
                                            <a href="injectables/DeliveryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeliveryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/GeneralSettingsModule.html" data-type="entity-link" >GeneralSettingsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-GeneralSettingsModule-4403f287f25e9ab608a6a7ecc8fde4301cb08c906eb849523c904ac30a1fa8c9a3e1e53e3bed7c7468656b77badba3cea25d8486fc07c75fd89336aeb296ecc9"' : 'data-bs-target="#xs-controllers-links-module-GeneralSettingsModule-4403f287f25e9ab608a6a7ecc8fde4301cb08c906eb849523c904ac30a1fa8c9a3e1e53e3bed7c7468656b77badba3cea25d8486fc07c75fd89336aeb296ecc9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-GeneralSettingsModule-4403f287f25e9ab608a6a7ecc8fde4301cb08c906eb849523c904ac30a1fa8c9a3e1e53e3bed7c7468656b77badba3cea25d8486fc07c75fd89336aeb296ecc9"' :
                                            'id="xs-controllers-links-module-GeneralSettingsModule-4403f287f25e9ab608a6a7ecc8fde4301cb08c906eb849523c904ac30a1fa8c9a3e1e53e3bed7c7468656b77badba3cea25d8486fc07c75fd89336aeb296ecc9"' }>
                                            <li class="link">
                                                <a href="controllers/GeneralSettingsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GeneralSettingsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-GeneralSettingsModule-4403f287f25e9ab608a6a7ecc8fde4301cb08c906eb849523c904ac30a1fa8c9a3e1e53e3bed7c7468656b77badba3cea25d8486fc07c75fd89336aeb296ecc9"' : 'data-bs-target="#xs-injectables-links-module-GeneralSettingsModule-4403f287f25e9ab608a6a7ecc8fde4301cb08c906eb849523c904ac30a1fa8c9a3e1e53e3bed7c7468656b77badba3cea25d8486fc07c75fd89336aeb296ecc9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GeneralSettingsModule-4403f287f25e9ab608a6a7ecc8fde4301cb08c906eb849523c904ac30a1fa8c9a3e1e53e3bed7c7468656b77badba3cea25d8486fc07c75fd89336aeb296ecc9"' :
                                        'id="xs-injectables-links-module-GeneralSettingsModule-4403f287f25e9ab608a6a7ecc8fde4301cb08c906eb849523c904ac30a1fa8c9a3e1e53e3bed7c7468656b77badba3cea25d8486fc07c75fd89336aeb296ecc9"' }>
                                        <li class="link">
                                            <a href="injectables/GeneralSettingsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GeneralSettingsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrdersModule.html" data-type="entity-link" >OrdersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-OrdersModule-7ac9abd99d289585aec69ac3862b13c3a5ea8252fb77b63e2e8627cfaea88082504abe9b1ada4c1257039871ec0a1b9b177e4b54bdb5d9bce6e1384c44744a88"' : 'data-bs-target="#xs-controllers-links-module-OrdersModule-7ac9abd99d289585aec69ac3862b13c3a5ea8252fb77b63e2e8627cfaea88082504abe9b1ada4c1257039871ec0a1b9b177e4b54bdb5d9bce6e1384c44744a88"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OrdersModule-7ac9abd99d289585aec69ac3862b13c3a5ea8252fb77b63e2e8627cfaea88082504abe9b1ada4c1257039871ec0a1b9b177e4b54bdb5d9bce6e1384c44744a88"' :
                                            'id="xs-controllers-links-module-OrdersModule-7ac9abd99d289585aec69ac3862b13c3a5ea8252fb77b63e2e8627cfaea88082504abe9b1ada4c1257039871ec0a1b9b177e4b54bdb5d9bce6e1384c44744a88"' }>
                                            <li class="link">
                                                <a href="controllers/OrdersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrdersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OrdersModule-7ac9abd99d289585aec69ac3862b13c3a5ea8252fb77b63e2e8627cfaea88082504abe9b1ada4c1257039871ec0a1b9b177e4b54bdb5d9bce6e1384c44744a88"' : 'data-bs-target="#xs-injectables-links-module-OrdersModule-7ac9abd99d289585aec69ac3862b13c3a5ea8252fb77b63e2e8627cfaea88082504abe9b1ada4c1257039871ec0a1b9b177e4b54bdb5d9bce6e1384c44744a88"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrdersModule-7ac9abd99d289585aec69ac3862b13c3a5ea8252fb77b63e2e8627cfaea88082504abe9b1ada4c1257039871ec0a1b9b177e4b54bdb5d9bce6e1384c44744a88"' :
                                        'id="xs-injectables-links-module-OrdersModule-7ac9abd99d289585aec69ac3862b13c3a5ea8252fb77b63e2e8627cfaea88082504abe9b1ada4c1257039871ec0a1b9b177e4b54bdb5d9bce6e1384c44744a88"' }>
                                        <li class="link">
                                            <a href="injectables/OrdersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrdersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link" >ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProductsModule-01da0e1b7d82b2ef1e60eb957f875f60d4b8cc9d3b2f272d88d783c2b7d35d11d9c8c317f0e11968722dd16c13b0e346d011b8575a95e87c68829a4cc1918bfd"' : 'data-bs-target="#xs-controllers-links-module-ProductsModule-01da0e1b7d82b2ef1e60eb957f875f60d4b8cc9d3b2f272d88d783c2b7d35d11d9c8c317f0e11968722dd16c13b0e346d011b8575a95e87c68829a4cc1918bfd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductsModule-01da0e1b7d82b2ef1e60eb957f875f60d4b8cc9d3b2f272d88d783c2b7d35d11d9c8c317f0e11968722dd16c13b0e346d011b8575a95e87c68829a4cc1918bfd"' :
                                            'id="xs-controllers-links-module-ProductsModule-01da0e1b7d82b2ef1e60eb957f875f60d4b8cc9d3b2f272d88d783c2b7d35d11d9c8c317f0e11968722dd16c13b0e346d011b8575a95e87c68829a4cc1918bfd"' }>
                                            <li class="link">
                                                <a href="controllers/ProductsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductsModule-01da0e1b7d82b2ef1e60eb957f875f60d4b8cc9d3b2f272d88d783c2b7d35d11d9c8c317f0e11968722dd16c13b0e346d011b8575a95e87c68829a4cc1918bfd"' : 'data-bs-target="#xs-injectables-links-module-ProductsModule-01da0e1b7d82b2ef1e60eb957f875f60d4b8cc9d3b2f272d88d783c2b7d35d11d9c8c317f0e11968722dd16c13b0e346d011b8575a95e87c68829a4cc1918bfd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductsModule-01da0e1b7d82b2ef1e60eb957f875f60d4b8cc9d3b2f272d88d783c2b7d35d11d9c8c317f0e11968722dd16c13b0e346d011b8575a95e87c68829a4cc1918bfd"' :
                                        'id="xs-injectables-links-module-ProductsModule-01da0e1b7d82b2ef1e60eb957f875f60d4b8cc9d3b2f272d88d783c2b7d35d11d9c8c317f0e11968722dd16c13b0e346d011b8575a95e87c68829a4cc1918bfd"' }>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsModule.html" data-type="entity-link" >SettingsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SettingsModule-f3274525609847824a2bbaa02406b16028f62686c7b800647d91f26e56120b747936f0f9fa80c740560f9f8c18c99d5dec0de34492fb717eafc7328861f1d494"' : 'data-bs-target="#xs-controllers-links-module-SettingsModule-f3274525609847824a2bbaa02406b16028f62686c7b800647d91f26e56120b747936f0f9fa80c740560f9f8c18c99d5dec0de34492fb717eafc7328861f1d494"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SettingsModule-f3274525609847824a2bbaa02406b16028f62686c7b800647d91f26e56120b747936f0f9fa80c740560f9f8c18c99d5dec0de34492fb717eafc7328861f1d494"' :
                                            'id="xs-controllers-links-module-SettingsModule-f3274525609847824a2bbaa02406b16028f62686c7b800647d91f26e56120b747936f0f9fa80c740560f9f8c18c99d5dec0de34492fb717eafc7328861f1d494"' }>
                                            <li class="link">
                                                <a href="controllers/GeneralSettingsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GeneralSettingsController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/SettingsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SettingsController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-d5020981a34db91e756d2de9bc1d7278b818796570cfbbc1a2112f87bd40365f19effa3e8092cb974a2e2a3c600b911d2a30b02a99df1bef9012fe86a3359738"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-d5020981a34db91e756d2de9bc1d7278b818796570cfbbc1a2112f87bd40365f19effa3e8092cb974a2e2a3c600b911d2a30b02a99df1bef9012fe86a3359738"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-d5020981a34db91e756d2de9bc1d7278b818796570cfbbc1a2112f87bd40365f19effa3e8092cb974a2e2a3c600b911d2a30b02a99df1bef9012fe86a3359738"' :
                                            'id="xs-controllers-links-module-UsersModule-d5020981a34db91e756d2de9bc1d7278b818796570cfbbc1a2112f87bd40365f19effa3e8092cb974a2e2a3c600b911d2a30b02a99df1bef9012fe86a3359738"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-d5020981a34db91e756d2de9bc1d7278b818796570cfbbc1a2112f87bd40365f19effa3e8092cb974a2e2a3c600b911d2a30b02a99df1bef9012fe86a3359738"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-d5020981a34db91e756d2de9bc1d7278b818796570cfbbc1a2112f87bd40365f19effa3e8092cb974a2e2a3c600b911d2a30b02a99df1bef9012fe86a3359738"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-d5020981a34db91e756d2de9bc1d7278b818796570cfbbc1a2112f87bd40365f19effa3e8092cb974a2e2a3c600b911d2a30b02a99df1bef9012fe86a3359738"' :
                                        'id="xs-injectables-links-module-UsersModule-d5020981a34db91e756d2de9bc1d7278b818796570cfbbc1a2112f87bd40365f19effa3e8092cb974a2e2a3c600b911d2a30b02a99df1bef9012fe86a3359738"' }>
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
                                    <a href="controllers/AddressController.html" data-type="entity-link" >AddressController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DeliveriesController.html" data-type="entity-link" >DeliveriesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/GeneralSettingsController.html" data-type="entity-link" >GeneralSettingsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/OrdersController.html" data-type="entity-link" >OrdersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProductsController.html" data-type="entity-link" >ProductsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SettingsController.html" data-type="entity-link" >SettingsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Address.html" data-type="entity-link" >Address</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Delivery.html" data-type="entity-link" >Delivery</a>
                                </li>
                                <li class="link">
                                    <a href="entities/GeneralSettings.html" data-type="entity-link" >GeneralSettings</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Order.html" data-type="entity-link" >Order</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Product.html" data-type="entity-link" >Product</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
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
                                <a href="classes/CreateAddressDto.html" data-type="entity-link" >CreateAddressDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDeliveryDto.html" data-type="entity-link" >CreateDeliveryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAddressParamDto.html" data-type="entity-link" >GetAddressParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetProductParamsDto.html" data-type="entity-link" >GetProductParamsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchAddressDto.html" data-type="entity-link" >PatchAddressDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchDeliveryDto.html" data-type="entity-link" >PatchDeliveryDto</a>
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
                                    <a href="injectables/AddressService.html" data-type="entity-link" >AddressService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateAddressProvider.html" data-type="entity-link" >CreateAddressProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeliveryService.html" data-type="entity-link" >DeliveryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GeneralSettingsService.html" data-type="entity-link" >GeneralSettingsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GetAddressProvider.html" data-type="entity-link" >GetAddressProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrdersService.html" data-type="entity-link" >OrdersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PatchAddressProvider.html" data-type="entity-link" >PatchAddressProvider</a>
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
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
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