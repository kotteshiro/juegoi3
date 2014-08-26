var path = 'recursos/imagenes/';
var sounds = 'recursos/sonidos/j2/';
var _images_ = [
    // Contenido Variable:
    {id: 'fondo',url: path + 'j2/fondo.png'}, 
    {id: 'titulo',url: path + 'j2/titulo.png'}, 
    {id: 'descripcion',url: path + 'j2/descripcion.png'}, 
    {id: 'enunciado',url: path + 'j2/enunciado_n123.png'}, 
    // Específico Juego:
    {id: 'fondo_hojas',url: path + 'j2/fondohojas.png'}, 
    {id: 'figlit_personificacion',url: path + 'j2/fig_lit_personificacion.png'}, 
    {id: 'figlit_comparacion',url: path + 'j2/fig_lit_comparacion.png'}, 
    {id: 'figlit_hiperbole',url: path + 'j2/fig_lit_hiperbole.png'}, 
    {id: 'figlit_metafora',url: path + 'j2/fig_lit_metafora.png'}, 
    {id: 'flit_libros_sprite',url: path + 'j2/figuras_literarias.png'}
];
var _sonido_espe_ = [
    {id:"bgmusic" , url: "recursos/sonidos/j2/MUSICA-LENGUAJE.mp3", volume:.3},
    {id:"sonidoTitulo" , url: "recursos/sonidos/j2/VJ_001L_titulo.mp3"},
    {id:"sonidoIntro" , url: "recursos/sonidos/j2/VJ_001L_intro.mp3"},
    {id:"sonidoEnunciado" , url: "recursos/sonidos/j2/VJ_001L_enunciado.mp3"}
];
         
subtmitfiles(_images_);