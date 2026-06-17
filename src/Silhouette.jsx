export default function Silhouette({ theme = 'night' }) {
  switch (theme) {
    case 'purple':  return <CosmicSilhouette />
    case 'teal':    return <OceanSilhouette />
    case 'crimson': return <DesertSilhouette />
    case 'emerald': return <ForestSilhouette />
    case 'silver':  return <CastleSilhouette />
    default:        return <VillageSilhouette />
  }
}

function VillageSilhouette() {
  return (
    <svg className="silhouette" viewBox="0 0 800 220" preserveAspectRatio="none">
      <path d="M0,140 Q80,80 180,110 Q280,140 380,90 Q480,40 580,80 Q680,120 800,95 L800,220 L0,220 Z" fill="#060e24"/>
      <ellipse cx="72" cy="110" rx="18" ry="75" fill="#040c1c"/>
      <ellipse cx="72" cy="130" rx="22" ry="60" fill="#050d1e"/>
      <ellipse cx="68" cy="95"  rx="14" ry="50" fill="#040b1a"/>
      <rect x="550" y="115" width="50" height="65" fill="#060e20"/>
      <polygon points="550,115 575,78 600,115" fill="#070f22"/>
      <rect x="605" y="130" width="38" height="50" fill="#050d1e"/>
      <rect x="648" y="138" width="30" height="42" fill="#060e20"/>
      <rect x="508" y="128" width="36" height="52" fill="#050c1e"/>
      <rect x="560" y="138" width="8" height="8" fill="#f5d02044" rx="1"/>
      <rect x="578" y="138" width="8" height="8" fill="#f5d02044" rx="1"/>
      <rect x="614" y="148" width="7" height="7" fill="#f5d02033" rx="1"/>
      <rect x="516" y="144" width="7" height="8" fill="#f5d02033" rx="1"/>
      <rect x="573" y="60" width="4" height="18" fill="#070f22"/>
      <rect x="568" y="66" width="14" height="4" fill="#070f22"/>
    </svg>
  )
}

function CosmicSilhouette() {
  return (
    <svg className="silhouette" viewBox="0 0 800 220" preserveAspectRatio="none">
      {/* alien ground plane */}
      <path d="M0,178 Q200,168 400,174 Q600,180 800,170 L800,220 L0,220 Z" fill="#0a0220"/>
      {/* large crater rim centre */}
      <path d="M210,174 Q400,148 590,174" fill="none" stroke="#0f0530" strokeWidth="7"/>
      <path d="M230,174 Q400,155 570,174" fill="none" stroke="#0c0328" strokeWidth="4"/>
      {/* small crater right */}
      <path d="M618,170 Q680,156 742,170" fill="none" stroke="#0e0428" strokeWidth="5"/>
      {/* tiny crater left */}
      <path d="M42,174 Q90,163 138,174" fill="none" stroke="#0d0425" strokeWidth="4"/>
      {/* tall monolith left */}
      <rect x="118" y="95" width="16" height="83" fill="#0a0220"/>
      <polygon points="118,95 126,72 134,95" fill="#0d0330"/>
      {/* medium monolith far left */}
      <rect x="52" y="128" width="11" height="50" fill="#09021c"/>
      <polygon points="52,128 57.5,112 63,128" fill="#0c0328"/>
      {/* monolith right */}
      <rect x="678" y="108" width="14" height="66" fill="#0a0220"/>
      <polygon points="678,108 685,84 692,108" fill="#0d0330"/>
      {/* alien dome / habitat */}
      <path d="M490,174 Q490,138 540,132 Q590,138 590,174 Z" fill="#0c0328"/>
      <ellipse cx="540" cy="174" rx="50" ry="8" fill="#0a0220"/>
      {/* dome viewport */}
      <ellipse cx="540" cy="150" rx="14" ry="10" fill="#c8a0ff18"/>
      {/* small transmitter on dome */}
      <rect x="537" y="128" width="3" height="14" fill="#0e0530"/>
      <rect x="531" y="128" width="15" height="2" fill="#0e0530"/>
      {/* ground rocks */}
      <ellipse cx="300" cy="175" rx="22" ry="6" fill="#0c0328"/>
      <ellipse cx="660" cy="172" rx="15" ry="5" fill="#0b0225"/>
    </svg>
  )
}

function OceanSilhouette() {
  return (
    <svg className="silhouette" viewBox="0 0 800 220" preserveAspectRatio="none">
      {/* deep water body */}
      <path d="M0,155 Q200,140 400,150 Q600,160 800,145 L800,220 L0,220 Z" fill="#030c12"/>
      {/* sandy beach */}
      <path d="M0,190 Q120,178 280,185 Q480,194 680,182 Q740,178 800,184 L800,220 L0,220 Z" fill="#041018"/>
      {/* wave 1 */}
      <path d="M0,162 Q50,153 100,162 Q150,171 200,162 Q250,153 300,162" fill="none" stroke="#062030" strokeWidth="3.5"/>
      {/* wave 2 */}
      <path d="M290,156 Q340,148 390,156 Q440,164 490,156 Q540,148 590,156" fill="none" stroke="#051828" strokeWidth="3"/>
      {/* wave 3 distant */}
      <path d="M580,150 Q630,143 680,150 Q730,157 780,150" fill="none" stroke="#04141e" strokeWidth="2.5"/>
      {/* lighthouse body */}
      <rect x="658" y="82" width="26" height="100" fill="#030c12"/>
      {/* lighthouse stripes */}
      <rect x="658" y="108" width="26" height="9" fill="#041420"/>
      <rect x="658" y="130" width="26" height="9" fill="#041420"/>
      {/* lantern room */}
      <rect x="652" y="74" width="38" height="12" fill="#041018"/>
      {/* lighthouse dome cap */}
      <polygon points="654,74 671,52 688,74" fill="#030c12"/>
      {/* light glow */}
      <ellipse cx="671" cy="70" rx="6" ry="4" fill="#00d4e820"/>
      {/* lighthouse base */}
      <rect x="648" y="178" width="46" height="10" fill="#041520"/>
      {/* palm trunk */}
      <path d="M162,200 Q158,172 150,148 Q144,126 152,108" fill="none" stroke="#030c12" strokeWidth="8"/>
      {/* palm fronds */}
      <path d="M152,108 Q120,88 94,96"  fill="none" stroke="#041420" strokeWidth="5"/>
      <path d="M152,108 Q138,78 122,70" fill="none" stroke="#041420" strokeWidth="5"/>
      <path d="M152,108 Q162,74 168,62" fill="none" stroke="#041420" strokeWidth="5"/>
      <path d="M152,108 Q178,80 198,80" fill="none" stroke="#041420" strokeWidth="5"/>
      <path d="M152,108 Q190,104 208,114" fill="none" stroke="#041420" strokeWidth="4"/>
      {/* coconuts */}
      <circle cx="148" cy="114" r="5" fill="#030a0e"/>
      <circle cx="158" cy="112" r="4" fill="#030a0e"/>
      {/* second smaller palm right */}
      <path d="M310,200 Q307,178 302,158 Q298,140 304,126" fill="none" stroke="#030c12" strokeWidth="6"/>
      <path d="M304,126 Q285,110 268,116" fill="none" stroke="#041420" strokeWidth="4"/>
      <path d="M304,126 Q294,104 282,98"  fill="none" stroke="#041420" strokeWidth="4"/>
      <path d="M304,126 Q312,100 318,92"  fill="none" stroke="#041420" strokeWidth="4"/>
      <path d="M304,126 Q326,108 338,110" fill="none" stroke="#041420" strokeWidth="4"/>
      {/* distant island silhouette */}
      <path d="M440,154 Q480,138 520,154 Z" fill="#030e18"/>
    </svg>
  )
}

function DesertSilhouette() {
  return (
    <svg className="silhouette" viewBox="0 0 800 220" preserveAspectRatio="none">
      {/* desert floor */}
      <path d="M0,178 Q200,172 400,176 Q600,180 800,174 L800,220 L0,220 Z" fill="#0e0102"/>
      {/* left mesa — tall */}
      <path d="M55,178 L58,92 L122,88 L125,178 Z" fill="#0e0102"/>
      <rect x="54" y="84" width="74" height="10" fill="#140204"/>
      {/* mesa shadow face */}
      <path d="M55,178 L58,92 L80,178 Z" fill="#0a0101"/>
      {/* right mesa — wide, shorter */}
      <path d="M565,178 L572,118 L668,112 L672,178 Z" fill="#0e0102"/>
      <rect x="564" y="106" width="112" height="14" fill="#140204"/>
      <path d="M565,178 L572,118 L610,178 Z" fill="#0a0101"/>
      {/* far-right butte */}
      <path d="M726,178 L728,145 L768,140 L770,178 Z" fill="#0c0102"/>
      <rect x="725" y="134" width="47" height="10" fill="#120204"/>
      {/* saguaro cactus, centre-left */}
      <rect x="292" y="112" width="12" height="66" fill="#0e0102"/>
      {/* left arm */}
      <rect x="268" y="124" width="24" height="8" fill="#0e0102"/>
      <rect x="268" y="106" width="8" height="26" fill="#0e0102"/>
      {/* right arm */}
      <rect x="304" y="130" width="22" height="8" fill="#0e0102"/>
      <rect x="318" y="114" width="8" height="24" fill="#0e0102"/>
      {/* second shorter cactus */}
      <rect x="422" y="136" width="9" height="42" fill="#0c0102"/>
      <rect x="406" y="146" width="16" height="6" fill="#0c0102"/>
      <rect x="406" y="134" width="6" height="18" fill="#0c0102"/>
      {/* scattered rocks */}
      <ellipse cx="190" cy="177" rx="28" ry="7" fill="#0c0102"/>
      <ellipse cx="490" cy="176" rx="20" ry="6" fill="#0c0102"/>
      <ellipse cx="700" cy="176" rx="16" ry="5" fill="#0c0102"/>
      {/* dry cracked ground lines */}
      <path d="M0,185 Q100,183 200,186 Q300,189 400,185" fill="none" stroke="#100102" strokeWidth="1.5"/>
      <path d="M400,183 Q500,180 600,184 Q700,188 800,183" fill="none" stroke="#100102" strokeWidth="1.5"/>
    </svg>
  )
}

function ForestSilhouette() {
  return (
    <svg className="silhouette" viewBox="0 0 800 220" preserveAspectRatio="none">
      {/* rolling hills */}
      <path d="M0,170 Q100,115 200,145 Q300,170 400,122 Q500,82 600,128 Q700,158 800,140 L800,220 L0,220 Z" fill="#030e04"/>
      {/* background hill layer */}
      <path d="M0,185 Q150,175 300,182 Q500,192 700,178 Q750,174 800,180 L800,220 L0,220 Z" fill="#041006"/>
      {/* pine tree 1 */}
      <polygon points="68,180 86,112 104,180" fill="#020a02"/>
      <rect x="82" y="177" width="8" height="22" fill="#031004"/>
      {/* pine tree 2 — taller */}
      <polygon points="118,175 140,96 162,175" fill="#031004"/>
      <rect x="136" y="172" width="8" height="24" fill="#020a02"/>
      {/* pine tree 3 */}
      <polygon points="188,178 206,120 224,178" fill="#020a02"/>
      <rect x="202" y="175" width="8" height="20" fill="#031004"/>
      {/* cabin */}
      <rect x="328" y="158" width="70" height="50" fill="#030e04"/>
      <polygon points="320,158 363,124 406,158" fill="#041206"/>
      {/* cabin door */}
      <rect x="353" y="178" width="20" height="30" fill="#020a02"/>
      {/* cabin windows */}
      <rect x="335" y="165" width="14" height="11" fill="#40d87822"/>
      <rect x="379" y="165" width="14" height="11" fill="#40d87822"/>
      {/* chimney */}
      <rect x="376" y="130" width="10" height="26" fill="#031004"/>
      <rect x="373" y="126" width="16" height="6" fill="#020a02"/>
      {/* pine tree 4 right of cabin */}
      <polygon points="490,168 508,108 526,168" fill="#031004"/>
      <rect x="504" y="165" width="8" height="22" fill="#020a02"/>
      {/* pine tree 5 */}
      <polygon points="555,172 575,104 595,172" fill="#020a02"/>
      <rect x="571" y="169" width="8" height="22" fill="#031004"/>
      {/* pine tree 6 — large right */}
      <polygon points="660,168 682,94 704,168" fill="#031004"/>
      <rect x="678" y="165" width="8" height="24" fill="#020a02"/>
      {/* pine tree 7 far right */}
      <polygon points="718,175 734,122 750,175" fill="#020a02"/>
      <rect x="730" y="172" width="8" height="20" fill="#031004"/>
      {/* small shrubs */}
      <ellipse cx="255" cy="178" rx="18" ry="8" fill="#031004"/>
      <ellipse cx="450" cy="176" rx="14" ry="7" fill="#020a02"/>
    </svg>
  )
}

function CastleSilhouette() {
  return (
    <svg className="silhouette" viewBox="0 0 800 220" preserveAspectRatio="none">
      {/* gothic hill */}
      <path d="M0,195 Q200,188 350,155 Q460,130 560,158 Q680,178 800,190 L800,220 L0,220 Z" fill="#060608"/>
      {/* castle main body */}
      <rect x="312" y="122" width="176" height="88" fill="#060608"/>
      {/* main battlements */}
      {[312,330,348,366,384,402,420,438,456,474].map((x,i) => (
        <rect key={i} x={x} y="112" width="13" height="14" fill="#060608"/>
      ))}
      {/* left tower */}
      <rect x="288" y="98" width="42" height="112" fill="#07070e"/>
      {/* left tower battlements */}
      <rect x="288" y="88" width="11" height="14" fill="#07070e"/>
      <rect x="305" y="88" width="11" height="14" fill="#07070e"/>
      <rect x="322" y="88" width="8"  height="14" fill="#07070e"/>
      {/* left spire */}
      <polygon points="288,88 309,48 330,88" fill="#08080f"/>
      {/* right tower */}
      <rect x="470" y="92" width="42" height="118" fill="#07070e"/>
      {/* right tower battlements */}
      <rect x="470" y="82" width="11" height="14" fill="#07070e"/>
      <rect x="487" y="82" width="11" height="14" fill="#07070e"/>
      <rect x="504" y="82" width="8"  height="14" fill="#07070e"/>
      {/* right spire */}
      <polygon points="470,82 491,40 512,82" fill="#08080f"/>
      {/* small turret far left of castle */}
      <rect x="256" y="128" width="28" height="82" fill="#060608"/>
      <polygon points="256,128 270,108 284,128" fill="#07070e"/>
      {/* gate arch */}
      <rect x="372" y="162" width="56" height="48" fill="#040408"/>
      <path d="M372,162 Q400,140 428,162 Z" fill="#040408"/>
      {/* castle windows */}
      <rect x="330" y="136" width="16" height="18" fill="#e0e0f012"/>
      <rect x="454" y="136" width="16" height="18" fill="#e0e0f012"/>
      <rect x="334" y="116" width="11" height="13" fill="#e0e0f00d"/>
      {/* arched window above gate */}
      <rect x="388" y="130" width="24" height="20" fill="#e0e0f018"/>
      <path d="M388,130 Q400,120 412,130 Z" fill="#e0e0f018"/>
      {/* bare tree left */}
      <rect x="182" y="158" width="7" height="58" fill="#060608"/>
      <rect x="189" y="168" width="44" height="4" fill="#060608"/>
      <rect x="189" y="178" width="30" height="3" fill="#060608"/>
      <rect x="145" y="166" width="37" height="4" fill="#060608"/>
      <rect x="145" y="176" width="25" height="3" fill="#060608"/>
      <rect x="220" y="175" width="22" height="3" fill="#060608"/>
      {/* bare tree right */}
      <rect x="628" y="162" width="6" height="50" fill="#07070e"/>
      <rect x="634" y="172" width="36" height="3" fill="#07070e"/>
      <rect x="634" y="180" width="24" height="3" fill="#07070e"/>
      <rect x="598" y="170" width="30" height="3" fill="#07070e"/>
    </svg>
  )
}
