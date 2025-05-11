"use client";
import React, { useState } from "react";
import "../styles/Edukacija.css";

export default function Edukacija() {
    const [openOsnovne, setOpenOsnovne] = useState(false);
    const [openPovrede, setOpenPovrede] = useState(false);

  return (
    <div className="page">
      
      <nav className="navbar">
        <div className="logo">Budi nečiji heroj</div>
        <div className="nav-links">
          <a href="/kviz">Kviz</a>
          <a href="/forum">Forum</a>
        </div>
      </nav>

      
      <section className="hero">
        <div className="hero-text">
          <h1>Učite prvu pomoć<br />na jednostavan način</h1>
          <p>Video lekcije, slike i upute — sve na jednom mjestu.</p>
          
        </div>
        <div className="hero-image">
          <img src="/cpr.png" alt="CPR ilustracija" />
        </div>
      </section>

     
      <section className="cards">
        <div className="card">
          <h3> Osnovne tehnike</h3>
          <p>Saznajte nešto više o osnovnim tehnikama prve pomoći.</p>
        </div>
        <div className="card">
          <h3> Postupanje kod povreda</h3>
          <p>Šta uraditi kod preloma, uganuća, rana itd.</p>
        </div>
        <div className="card">
          <h3> Slike</h3>
          <p>Vizualni prikaz ispravnog pružanja prve pomoći.</p>
        </div>
        <div className="card">
          <h3> Video</h3>
          <p>Pogledajte edukativne videe iz oblasti prve pomoći.</p>
        </div>
      </section>
    
    <div className="osnovne-wrapper">
      <button className="accordion-button" onClick={() => setOpenOsnovne(!openOsnovne)}>
        {openOsnovne ? "−" : "+"} Osnovne tehnike
      </button>

      {openOsnovne && (
        <div className="tehnike-content">
          {/* 1. Reanimacija (odrasli) */}
          <div className="tehnika-blok">
            <h2>1. <strong>Reanimacija (CPR za odrasle)</strong></h2>
            <div className="linija">
              <p>
                Reanimacija, ili kardiopulmonalna reanimacija (CPR), predstavlja ključni lanac preživljavanja kod osoba koje su doživjele srčani zastoj. Cilj ove procedure je održavanje osnovne cirkulacije krvi i dotoka kiseonika u mozak dok ne stigne stručna pomoć. Zanimljivo je da pravilno primijenjena reanimacija u prvim minutama značajno povećava šanse za preživljavanje, čak i kod iznenadnih srčanih udara. Važno je razumjeti da srce koje stane još može biti "spaseno" ako se djeluje brzo i odlučno.
              </p>
            </div>
          </div>

          {/* 2. Reanimacija za bebe */}
          <div className="tehnika-blok">
            <h2>2. <strong>Reanimacija za bebe (do 1 godine)</strong></h2>
            <div className="linija">
              <p>
                Kod beba je srčani zastoj mnogo rjeđe uzrokovan srčanim oboljenjima, a češće dolazi kao posljedica otežanog disanja — npr. gušenja ili infekcija. Upravo zbog toga, tehnike reanimacije za bebe su nježnije, ali podjednako vitalne. Poznavanje ovih specifičnih metoda može biti presudno za spas života novorođenčeta. Roditelji, staratelji i osoblje u vrtićima spadaju u rizične grupe koje bi trebale imati osnovno znanje iz ovog područja.
              </p>
            </div>
          </div>

          {/* 3. Imobilizacija */}
          <div className="tehnika-blok">
            <h2>3. <strong>Imobilizacija</strong></h2>
            <div className="linija">
              <p>
                Imobilizacija je tehnika koja ima za cilj sprečavanje dodatnog oštećenja kod sumnje na prelome, uganuća ili povrede kičme. Može zvučati jednostavno, ali pravilna imobilizacija zahtijeva razumijevanje anatomije i potencijalnih komplikacija koje mogu nastati uslijed nepažnje. Kod povreda kičme, na primjer, neadekvatno pomjeranje može dovesti do trajne paralize. Zato se imobilizacija često koristi kao "prva pomoć za stabilnost", do dolaska hitne službe.
              </p>
            </div>
          </div>

          {/* 4. Vještačko disanje */}
          <div className="tehnika-blok">
            <h2>4. <strong>Vještačko disanje</strong></h2>
            <div className="linija">
              <p>
                Vještačko disanje ima za cilj da osigura kiseonik u pluća osobe koja sama ne diše. Iako se danas najčešće koristi u kombinaciji sa masažom srca (kao dio CPR-a), ono ima svoju posebnu vrijednost u slučajevima gdje je srce još aktivno, ali je disanje prestalo (npr. utapanje, trovanje dimom). Vremenom su razvijene i različite maske i uređaji koji omogućavaju lakše izvođenje vještačkog disanja bez direktnog kontakta, što je posebno korisno u kriznim situacijama.
              </p>
            </div>
          </div>

          {/* 5. Heimlichov zahvat */}
          <div className="tehnika-blok">
            <h2>5. <strong>Heimlichov zahvat (za gušenje)</strong></h2>
            <div className="linija">
              <p>
                Heimlichov zahvat je tehnika koja je doslovno spasila hiljade života širom svijeta. Osmislio ga je američki ljekar Henry Heimlich 1970-ih godina, i od tada se koristi kao standardna prva pomoć kod gušenja hranom ili predmetima. Ono što ovu tehniku čini izuzetno efikasnom jeste jednostavna mehanika — stvara se vještački pritisak na dijafragmu, čime se tjera zrak iz pluća da "izbaci" strano tijelo iz disajnih puteva. Iako izgleda dramatično, pravilno izveden Heimlich je izuzetno siguran i efikasan.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
     <div className="osnovne-wrapper">
      <button className="accordion-button" onClick={() => setOpenPovrede(!openPovrede)}>
        {openPovrede ? "−" : "+"} Postupanje kod povreda
      </button>

      {openPovrede && (
        <div className="tehnike-content">
          {/* 1. Prelom kosti */}
          <div className="tehnika-blok">
            <h2>1. <strong>Prelom kosti</strong></h2>
            <div className="linija">
              <p>
                Prelom nastaje kada dođe do pucanja kosti uslijed jake sile, udara ili pada. Može biti zatvoren (bez izlaska kosti kroz kožu) ili otvoren (kada kost izlazi vani). Važno je znati da se prelomi ne vide uvijek golim okom – simptomi mogu uključivati bol, otok, deformaciju i gubitak funkcije. Edukacija o prepoznavanju i pravilnom postupanju sa prelomima pomaže u izbjegavanju dodatnih komplikacija.
              </p>
            </div>
          </div>

          {/* 2. Povreda glave */}
          <div className="tehnika-blok">
            <h2>2. <strong>Povreda glave</strong></h2>
            <div className="linija">
              <p>
                Povrede glave mogu biti spoljašnje (npr. ogrebotine ili posjekotine) ili unutrašnje, kao što su potres mozga i krvarenja unutar lobanje. Iako neka oštećenja djeluju bezopasno, simptomi se mogu javiti kasnije – poput glavobolje, mučnine ili zbunjenosti. Zato je važno biti upoznat s potencijalno skrivenim rizicima i znati kada potražiti hitnu medicinsku procjenu.
              </p>
            </div>
          </div>

          {/* 3. Povreda oka */}
          <div className="tehnika-blok">
            <h2>3. <strong>Povreda oka</strong></h2>
            <div className="linija">
              <p>
                Očne povrede su među najosjetljivijim i zahtijevaju pažljiv pristup. Strano tijelo, udarac, hemikalije ili čak prejak izvor svjetlosti mogu oštetiti strukturu oka. Čak i manji simptomi poput grebanja ili crvenila mogu ukazivati na ozbiljniji problem. Edukacija o prepoznavanju i rizicima povreda oka pomaže u sprečavanju trajnog gubitka vida.
              </p>
            </div>
          </div>

        {/* 4. Uganuće i istegnuće */}
            <div className="tehnika-blok">
            <h2>4. <strong>Uganuće i istegnuće</strong></h2>
            <div className="linija">
                <p>
                Uganuće nastaje kada dođe do istezanja ili kidanja ligamenata oko zgloba, najčešće uslijed naglog pokreta, pada ili uvrtanja. Istegnuća su slična, ali pogađaju mišiće ili tetive. Ove povrede su česte kod sportista i rekreativaca i obično uzrokuju otok, bol i ograničeno kretanje. Edukacija pomaže u razlikovanju između lakših i ozbiljnijih povreda zgloba, što je važno za dalje postupanje.
                </p>
            </div>
        </div>

        {/* 5. Rane */}
        <div className="tehnika-blok">
            <h2>5. <strong>Rane</strong></h2>
            <div className="linija">
                <p>
                Rane predstavljaju prekid kontinuiteta kože i mogu biti površinske ili duboke, jednostavne ili komplikovane. Mogu nastati rezanjem, grebanjem, trganjem, udarcem ili ubodom. Iako mnoge izgledaju bezopasno, važno je razumjeti razlike između npr. ogrebotina i dubokih posjekotina, jer rizik od infekcije i trajnog oštećenja varira. Osnovna edukacija o vrstama rana doprinosi boljoj procjeni kada i kako reagovati.
                </p>
            </div>
        </div>
        {/* 6. Opeklina */}
          <div className="tehnika-blok">
            <h2>6. <strong>Opeklina</strong></h2>
            <div className="linija">
              <p>
                Opekotine su oštećenja kože izazvana toplotom, hemikalijama, električnom energijom ili zračenjem. Dijele se na tri stepena prema dubini oštećenja. Pravilno razumijevanje vrsta opekotina i njihovih simptoma omogućava bolju procjenu ozbiljnosti povrede i potrebe za medicinskom intervencijom. Opekotine većeg obima mogu biti opasne po život zbog gubitka tečnosti i infekcija.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
    
    
  );
}

