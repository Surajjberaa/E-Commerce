import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRating({ rating, handleRatingChange }) {

    console.log(rating);


    return (
        [1, 2, 3, 4, 5].map(star =>
            <Button variant='outline' size='icon'
                onClick={handleRatingChange ? () => handleRatingChange(star) : null}
                className={`p-2 rounded-full transition-colors ${star <= rating ? 'text-green-500 hover:bg-black' : 'text-black hover:bg-primary hover:text-primary-foreground'}`}
            >
                <StarIcon className={`w-6 h-6 ${star <= rating ? 'fill-green-500' : 'fill-black'}`} />
            </Button>)
    )
}

export default StarRating