let tree = { name: 'Philip Samuel Rust', b: 1976, loc: 'Bellingham', parents: [
    { name: 'Patrick Nick Rust', b: 1951, loc: 'San Diego', short_notes: 'Carpenter', parents: [
      { name: 'James Nicholas Rust', b: 1928, short_notes: 'Postmaster', notes: '"Tonto" on Orcas because his brother-in-law, Cliff Vierick, is "The Lone Ranger"', parents: [
        { name: 'Samuel Philip Rust', b: 1903, short_notes: 'Bellingham Fire Chief', notes: 'Served in the Navy and worked for the US government in Turkey.', parents: [
          { name: 'Nicholas J. Rust', b: 1873, d: 1967, notes: 'Bellingham Police Chief. Lost tips of fingers in sawmill. We have his billy club. Was stopped after running a stop light on Holly St. When asked if he hadn\'t seen the light, answered: "Sonny, I PUT that light there!"', parents: [
            { name: 'Philip Rust', short_notes: 'Probably German origin' },
            { name: 'Ellen' }
          ]},
          { name: 'Maud Humphries', parents: [
            { name: 'Samuel Humphries', short_notes: 'Lake Samish settlers', notes: 'Original settlers on Lake Samish.' },
            { name: 'Mary Hemberger' }
          ]}
        ]},
        { name: 'Merrill Wanda Bamford', parents: [
          { name: 'Bamfords', notes: 'Traced back to Wales' },
          {}
        ]}
      ]},
      { name: 'Camilla Ernestine Rankin', b: 1930, loc: 'Tennessee', notes: 'Cami and Jim Rust were married at Pearl Harbor, Hawaii', parents: [
        { name: 'Ernest Leonard Rankin', b: 1906, short_notes: 'Coal miner.', parents: [
          { name: 'Rankin', short_notes: 'Coal miner.' },
          { name: 'McCoy', parents: [
            {},
            { short_notes: 'Cherokee Indian'}
          ]}
        ]},
        {
          name: 'Crystal Beene', b: 1909, parents: [
          { name: 'Jake Beene', b: 1878, d: 1939, parents: [
            { name: 'John Beene', b: 1857, parents: [
              { name: 'Jacob Beene', b: 1804, parents: [
                { name: 'William Beene', b: 1771, notes: 'Nephew of 1st white settler in Tennesse. British origin.' },
                { name: 'Martha Pack', b: 1774 }
              ]},
              { name: 'Nancy Bleancet'}
            ]},
            { name: 'Kitty Taylor', b: 1859, parents: [
              {},
              { name: 'Walker' }
            ]}
          ]},
          { name: 'Georgie Parker', b: 1880, parents: [
            { name: 'Frank Parker' },
            { name: 'Mary Ellen Doyle', b: 1859, loc: 'Tennessee', parents: [
              { name: 'Isaac Doyle' },
              { name: 'Polly Bryant' }
            ]}
          ]}
        ]}
      ]}
    ]},
    { name: 'Jean Marie MacLeod', b: 1952, loc: 'Bellingham', parents: [
      { name: 'Duncan MacLeod', b: 1924, loc: 'Lopez', short_notes: 'Xerox tech. rep.', notes: 'Hobby: Flying. Dropped out of high school for WWII and finished later.', parents: [
        { name: 'Malcolm James MacLeod', b: 1890, loc: 'Scotland', d: 1983, short_notes: 'Dairy farmer', notes: 'Lied about his age to get into the service for WWI. His sister, Mary, is married to Fred Trump (real estate empire in NYC).', parents: [
          { name: 'MacLeod', notes: 'Descended from 13th century king, Olsoc the Black King Leod of Denmark. Had two sons, one became MacLeod of Skye (Scotland), the other of Isle of Lewis (Scotland), which we are descended from.' },
          { name: 'Smith', parents: [
            { name: 'Smith', short_notes: 'Fisherman, drowned' },
            {}
          ]}
        ]},
        { name: 'Mary (Mae) Emma Higgins', b: 1893, loc: 'Vancouver, BC', notes: 'Aunt Kate came to the US in 1905.', parents: [
          { name: 'James Higgins', loc: 'Wales', parents: [
            { name: 'Higgins', short_notes: 'Railroad family', notes: 'Moved from Ireland to Wales.' },
            {}
          ]},
          { loc: 'Wales' }
        ]}
      ]},
      { name: 'Beverly Jean Hyland', b: 1930, loc: 'N. Dakota', parents: [
        { name: 'William Clinton Hyland', b: 1887, d: 1971, short_notes: 'Farmer until 36', parents: [
          { name: 'Hyland', loc: 'Illinois' },
          {}
        ]},
        { name: 'Ethel Irene Dunwoodie', b: 1894, loc: 'N. Dakota', d: 1985, short_notes: '29 great-grandchildren.', parents: [
          { name: 'Jesse Joseph Dunwoodie', short_notes: 'Pennysylvania Dutch', parents: [
            { name: '...to Thomas Jefferson' },
            {}
          ]},
          { name: 'Mary Rines', notes: 'Scottish/Irish', parents: [
            { name: 'Rines', loc: 'Indiana', parents: [
              {},
              { name: 'Barnard', loc: 'North Carolina', short_notes: 'Fought in Civil War.'}
            ]},
            {}
          ]}
        ]}
      ]}
    ]}
  ]
};

let line_no = 0;
let padding = 15;
renderTree(tree);

function renderTree(person) {
  person.ix = line_no;
  line_no++;
  let width = 0, height = 0;

  // depth-first traversal to calc width & height of tree
  if (person.parents) {
    let parent_ix = 0;
    for (let parent of person.parents) {
      let { width: parent_w, height: parent_h } = renderTree(parent);//, x + width + padding, y - height + parent_ix * height * 2);
      if (parent_w > width)
        width = parent_w;
      height += parent_h;
      parent_ix++;
    }
  }
  if (width)
    width += padding;

$('#tree').innerHTML += `<text id="psn_${person.ix}" font-family="Arial" font-size="12">
    ${person.name || '&#160;'}
  </text>`;
  let bbox = $('#psn_' + person.ix).getBBox();

  let loc_bbox = { width: 0, height: 0 };
  let note_bbox = { width: 0, height: 0 };
  if (person.b || person.loc) {
    let info = [];
    if (person.b) {
      info.push(`${person.b}${person.d ? `-${person.d}` : ''}`);
    }
    if (person.loc) {
      info.push(person.loc);
    }
    $('#tree').innerHTML += `<text id="loc_${person.ix}" font-family="Arial" font-style="italic" font-size="12" fill="#999">
      ${info.join(', ')}
    </text>`;
    loc_bbox = $('#loc_' + person.ix).getBBox();
  }
  if (person.short_notes) {
    $('#tree').innerHTML += `<text id="note_${person.ix}" font-family="Arial" font-style="italic" font-size="12" fill="#999">
      ${person.short_notes}
    </text>`;
    note_bbox = $('#note_' + person.ix).getBBox();
  }
  person.my_width = Math.max(bbox.width, loc_bbox.width, note_bbox.width);
  person.my_height = bbox.height;// + loc_bbox.height;
  width += person.my_width;
  height = Math.max(height, bbox.height + loc_bbox.height + note_bbox.height);
  //height += person.my_height;
  person.width = width;
  person.height = height;
  return { width, height};
}

let top_margin = 200;
let left_margin = 10;
let total_width = tree.width;
layoutPerson(tree, left_margin, top_margin);

function layoutPerson(person, x, y) {
  person.y = y + person.height / 2;
  person.x = x;

  let my_y = person.y + person.my_height * 1/3;
  let el = $('#psn_' + person.ix);
  el.setAttribute('x', person.x);
  el.setAttribute('y', my_y);
  if (person.name) {
    my_y += person.my_height;
  }

  let has_second_line = person.b || person.loc;
  if (has_second_line) {
    let el = $('#loc_' + person.ix);
    el.setAttribute('x', person.x);
    el.setAttribute('y', my_y);
    my_y += person.my_height;
  }
  if (person.short_notes) {
    let el = $('#note_' + person.ix);
    el.setAttribute('x', person.x);
    el.setAttribute('y', my_y);
  }

  if (person.parents) {
    for (let parent of person.parents) {
      layoutPerson(parent, x + person.my_width + padding, y);
      if (parent) {
        y += parent.height;
      }
    }

    let dad = person.parents[0];
    let mom = person.parents[1];
    $('#tree').innerHTML += `
      <line x1="${dad.x - padding/2}" y1="${dad.y}" x2="${mom.x - padding / 2}" y2="${mom.y}" stroke="#ddd" stroke-width="1" />
      <circle cx="${dad.x - padding/2}" cy="${dad.y}" r="3" fill="#ddd" />
      <circle cx="${mom.x - padding/2}" cy="${mom.y}"" r="3" fill="#ddd" />
    `;
  }
}

// $('#tree').innerHTML = `<polyline fill="none" stroke="black" stroke-width="1"
//   points="${[100, 200, 300].map((num, ix) => `${ix * 250},${850 - num}\n`)}"/>`

// util functions
function $(sel) {
  return document.querySelector(sel);
}
