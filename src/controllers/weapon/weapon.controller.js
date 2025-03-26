import { User } from "../../models/blog/user.model.js";
import { Weapon } from "../../models/weapon/weapon.model.js";


const addWeapon = async (req, res) => {
    console.log("andar hu")
    
    const username = req.username;
    const user = await User.findOne({username});
    if(!user.isMember){
        return res.status(402).send({
            message:"only member is allowed to add weapon"
        })
    }
    console.log("user in weapon", user);

    const{name, description, type, quantity, dnd, manufacturer, users} = req.body;
    const isduplicate = await Weapon.findOne({name});

    if(isduplicate){
        return res.status(402).send({
            message:"Weapon with same name already exist"
        })
    }
    
    const weapon = new Weapon({
        name,
        dnd,
        description,
        manufacturer,
        type,
        users,
        quantity,
        postedby:user._id,
    })

    await weapon.save()

    if(!weapon){
        return res.status(402),send({
            message:"unable to create weapon",
        })
    }

    return res.status(201).send({
        message:"Weapon added succesfully",
        weapon
    })

}

const allweapon = async (req, res) => {
    const link = req.url.split('/');
    const type = link[link.length - 1];
    console.log("type: ", type);

    const weapon = await Weapon.find({type});

    if(!weapon){
        return res.status(403).send({
            message:"unable to fetch weapon"
        })
    }

    return res.status(201).send({
        message:`Weapon of type:${type}`,
        weapon
    })
}



export {addWeapon, allweapon}