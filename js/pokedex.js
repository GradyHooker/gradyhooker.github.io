$(function() {
    $(".poke-item").click(function(){ changePokemon(this); });
	var items = $(".poke-item");
	items[Math.floor(Math.random()*items.length)].click();
});

function changePokemon(e) {
	$(".selected").removeClass("selected");
	
	var num_ele = $(e).find("div")[0];
	var num = $(num_ele).text();
	
	$(".big-photo").attr("src", "/assets/pokedex/" + num + ".jpg");
	$(".types").empty();
	$(".types").append("<img src='https://www.serebii.net/pokedex-bw/type/" + pokemon[num]["types"][0] + ".gif'/>");
	if(pokemon[num]["types"].length > 1) {
		$(".types").append("<img src='https://www.serebii.net/pokedex-bw/type/" + pokemon[num]["types"][1] + ".gif'/>");
	}
	$(".height").text(pokemon[num]["height"]);
	$(".weight").text(pokemon[num]["weight"]);
	$(".location").text("🗺️ " + pokemon[num]["location"]);
	$(".description").text(pokemon[num]["description"]);
	
	$(e).addClass("selected");
}

var pokemon = {
	"046": {
		"types": ["bug","grass"],
		"height": "0.3 m / 1'00\"",
		"weight": "5.4 kg / 11.9 lbs",
		"location": "Centennial Park, Auckland, New Zealand",
		"description": "Went for a walk through one of the parks near my house and spotted this little fella approaching a stream."
	},
	"079": {
		"types": ["water","psychic"],
		"height": "1.2 m / 3'11\"",
		"weight": "36.0 kg / 79.4 lbs",
		"location": "Campbells Bay, Auckland, New Zealand",
		"description": "Was on my way to a secret cove a found and this little Slowpoke blocking my path, I turned around and let him be - after taking some photos."
	},
	"845": {
		"types": ["flying","water"],
		"height": "0.8 m / 2'07\"",
		"weight": "18.0 kg / 39.7 lbs",
		"location": "Wairau Creek, Auckland, New Zealand",
		"description": "Had to take this photo from a bit further back, as soon as I tried to adjust and get a shot without the plant covering it, the Cramorant flew off..."
	},
	"627": {
		"types": ["normal","flying"],
		"height": "0.5 m / 1'08\"",
		"weight": "10.5 kg / 23.1 lbs",
		"location": "Wairau Creek, Auckland, New Zealand",
		"description": "This little boy was probably waiting in their nest for it's daddy Braviary, so I didn't stick around to find out."
	},
	"081": {
		"types": ["electric","steel"],
		"height": "0.3 m / 1'00\"",
		"weight": "6.0 kg / 13.2 lbs",
		"location": "Beach Road, Auckland, New Zealand",
		"description": "I almost didn't see this tiny Magnemite up by the power pole, but I heard a slight hiss and turned around to see them checking it out."
	},
	"021": {
		"types": ["normal","flying"],
		"height": "0.3 m / 1'00\"",
		"weight": "2.0 kg / 4.4 lbs",
		"location": "Wairau Creek, Auckland, New Zealand",
		"description": "I seemed to have awoken a little Spearow - it looked like it wanted to peck my face off so I apologised and quickly snapped this photo."
	},
	"369": {
		"types": ["water","rock"],
		"height": "1.0 m / 3'03\"",
		"weight": "23.4 kg / 51.6 lbs",
		"location": "Brian Byrnes Reserve, Auckland, NZ",
		"description": "It was dark and raining, but I'd recognise that red spot anywhere! I was shocked to find a Relicanth just floating under a bridge, I guess it wanted a break from the depths."
	},
	"618": {
		"types": ["ground","electric"],
		"height": "0.7 m / 2'04\"",
		"weight": "11.0 kg / 24.3 lbs",
		"location": "Wairau Creek, Auckland, New Zealand",
		"description": "This little bugger almost tricked me into thinking he was one of the cobbles for the path through this swampy land..."
	},
	"556": {
		"types": ["grass"],
		"height": "1.0 m / 3'03\"",
		"weight": "28.0 kg / 61.7 lbs",
		"location": "Wellington Botanic Garden, New Zealand",
		"description": "I completely missed this one, but my Research Assistant pointed out to me that there was something hiding with the cactus!"
	},
	"742": {
		"types": ["bug","fairy"],
		"height": "0.1 m / 0'04\"",
		"weight": "0.2 kg / 0.4 lbs",
		"location": "Wellington Botanic Garden, New Zealand",
		"description": "As one of the smallest Pokemon they are hard to see, but nestled amongst the flowerbed is a small swarm of 4 Cutiefly!"
	},
	"580": {
		"types": ["water","flying"],
		"height": "0.5 m / 1'08\"",
		"weight": "5.5 kg / 12.1 lbs",
		"location": "Wellington Botanic Garden, New Zealand",
		"description": "We were taking a break on a bench at this fountain and the Ducklett hopped up on top to give us a wave hello!"
	},
	"519": {
		"types": ["normal","flying"],
		"height": "0.3 m / 1'00\"",
		"weight": "2.1 kg / 4.6 lbs",
		"location": "Wellington Botanic Garden, New Zealand",
		"description": "This Pidove felt right at home on top of the head of this statue covered in pigeons and wasn't scared away by the many humans."
	},
	"008": {
		"types": ["water"],
		"height": "1.0 m / 3'03\"",
		"weight": "22.5 kg / 49.6 lbs",
		"location": "Wellington Botanic Garden, New Zealand",
		"description": "Wartortle was playing in the waterfall overlooking the Squirtle Pond and splashing people watching and taking photos."
	},
	"007": {
		"types": ["water"],
		"height": "0.5 m / 1'08\"",
		"weight": "9.0 kg / 19.8 lbs",
		"location": "Wellington Botanic Garden, New Zealand",
		"description": "With many of them swimming around, I caught this Squirtle standing up on a rock with another one sleeping behind him."
	},
	"541": {
		"types": ["bug","grass"],
		"height": "0.5 m / 1'08\"",
		"weight": "7.3 kg / 16.1 lbs",
		"location": "Wellington Botanic Garden, New Zealand",
		"description": "The Swadloon was having a snack on some of the leaves and ferns laying around the forest floor, it even let my Research Assistant get real close."
	},
	"429": {
		"types": ["ghost"],
		"height": "0.9 m / 2'11\"",
		"weight": "4.4 kg / 9.7 lbs",
		"location": "Wellington Botanic Garden, New Zealand",
		"description": "The fog started to roll in as we passed this house, out of the corner of my eye I saw the Mismagius lurking around anticipating an unsuspecting human."
	},
	"250": {
		"types": ["fire","flying"],
		"height": "3.8 m / 12'06\"",
		"weight": "199.0 kg / 438.7 lbs",
		"location": "Wellington Botanic Garden, New Zealand",
		"description": "We were admiring The Treehouse, before a shadow came overtop followed by streaks of gold and rainbow as Ho-Oh graced us with it's presence."
	},
	"190": {
		"types": ["normal"],
		"height": "0.8 m / 2'07\"",
		"weight": "11.5 kg / 25.4 lbs",
		"location": "Wellington Botanic Garden, New Zealand",
		"description": "This cheeky monkey was swinging on a lamp-post trying to get our attention, it wasn't until I started to edit that I noticed the second one."
	},
	"276": {
		"types": ["normal","flying"],
		"height": "0.3 m / 1'00\"",
		"weight": "2.3 kg / 5.1 lbs",
		"location": "Woodridge, Wellington, New Zealand",
		"description": "I looked out my kitchen window and saw this Taillow perching on the fence, there were a few scratch marks so it mustn't be it's first time in that spot."
	},
	"656": {
		"types": ["water"],
		"height": "0.3 m / 1'00\"",
		"weight": "7.0 kg / 14.5 lbs",
		"location": "Seton Nossiter Park, Wellington, NZ",
		"description": "This Froakie was hanging out near the waterfall pool and was so docile my Research Assistant was able to get right next to it and pop a pose."
	},
	"143": {
		"types": ["normal"],
		"height": "2.1 m / 6'11\"",
		"weight": "460.0 kg / 1014.1 lbs",
		"location": "Seton Nossiter Park, Wellington, NZ",
		"description": "This Snorlax must have gone for a walk through the muddy creek before deciding to block our path over this bridge, luckily leaving a gap to the left we could sneak through."
	},
	"013": {
		"types": ["bug","poison"],
		"height": "0.3 m / 1'00\"",
		"weight": "3.2 kg / 7.1 lbs",
		"location": "Seton Nossiter Park, Wellington, NZ",
		"description": "Looking for some leaves to munch on, this Weedle crawled out on the cut-down tree to say hello, before moving back towards their meal."
	},
	"821": {
		"types": ["flying"],
		"height": "0.2 m / 0'08\"",
		"weight": "1.8 kg / 4.0	lbs",
		"location": "Seton Nossiter Park, Wellington, NZ",
		"description": "On our way out of the forest, this Rookidee flew up to us and landed on some barbed wire right next to us, almost challenging us."
	},
	"004": {
		"types": ["fire"],
		"height": "0.6 m / 2'00\"",
		"weight": "8.5 kg / 18.7 lbs",
		"location": "Red Rocks, Wellington, New Zealand",
		"description": "We were climbing an uphill portion of the track to Red Rocks and came across this fire pit with a cute little CHarmander standing in the center."
	},
	"258": {
		"types": ["water"],
		"height": "0.4 m / 1'04\"",
		"weight": "7.6 kg / 16.8 lbs",
		"location": "Seton Nossiter Park, Wellington, NZ",
		"description": "There was a muddy river that we had to cross to keep going along the track, to my right I noticed this little blue guy huddled into a hole along the river bank."
	},
	"364": {
		"types": ["ice","water"],
		"height": "1.1 m / 3'07\"",
		"weight": "87.6 kg / 193.1 lbs",
		"location": "Red Rocks, Wellington, New Zealand",
		"description": "We got told that there were seals on Red Rocks, but I didn't except for there to be a Sealeo hanging out with them on the rocks in the sun."
	},
	"421": {
		"types": ["grass"],
		"height": "0.5 m / 1'08\"",
		"weight": "9.3 kg / 20.5 lbs",
		"location": "Victoria Esplanade, Palmerston North, NZ",
		"description": "It is cherry blossom season and we visited The Victoria Esplanade to see them, but we got more than we bargained for with a Cherrim showing off."
	},
	"492": {
		"types": ["grass"],
		"height": "0.2 m / 0'08\"",
		"weight": "2.1 kg / 4.6 lbs",
		"location": "Victoria Esplanade, Palmerston North, NZ",
		"description": "Shaymin graced us with it's presence around all of the cherry blossom trees, we offered it some flowers and it let us take a photo."
	},
	"708": {
		"types": ["ghost","grass"],
		"height": "0.4 m / 1'04\"",
		"weight": "7.0 kg / 15.4 lbs",
		"location": "Seton Nossiter Park, Wellington, NZ",
		"description": "It was starting to get dark, but I noticed some glowing red eyes and noises coming from under the bridge and it turned out to be a lone Phantump just floating around."
	},
	"816": {
		"types": ["water"],
		"height": "0.3 m / 1'00\"",
		"weight": "4.0 kg / 8.8 lbs",
		"location": "Seton Nossiter Park, Wellington, NZ",
		"description": "I've visited this small waterfall so many times, but this time there was an extra surprise with a Sobble thinking about going for a swim in the pond below."
	}
}
