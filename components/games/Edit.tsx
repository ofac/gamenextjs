"use client";

import { useState, useRef, 
         useTransition } 
                         from "react";
import { updateGame }    from "@/app/actions/game-actions";
import { useRouter }     from "next/navigation";
import PlusIconCustom    from "../icons/PlusIcon";

export default function EditGame({ consoles, game }: any) {

    const [errors, setErrors]          = useState<any>({});
    const [preview, setPreview]        = useState(`/imgs/${game.cover}`);
    const [isPending, startTransition] = useTransition();
    const [showToast, setShowToast]    = useState(false);
    const fileInputRef                 = useRef<HTMLInputElement>(null);
    const router                       = useRouter();

    const [form, setForm] = useState({
        title:       game.title,
        developer:   game.developer,
        releasedate: new Date(game.releasedate).toISOString().split('T')[0],
        price:       game.price,
        genre:       game.genre,
        description: game.description,
        console_id:  game.console_id,
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageClick = (e: React.MouseEvent) => {
        e.preventDefault();  
        e.stopPropagation();     
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];

        if (file) {
            const url:any = URL.createObjectURL(file);
            setPreview(url);
        }
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrors({});

      const formData = new FormData(e.currentTarget);

      startTransition(async () => {
          const res = await updateGame(formData);

          if (res?.error) {
              setErrors(res.error);
          } else {
              setShowToast(true);
              setTimeout(() => {
                  router.push("/games");
              }, 3000);
          }
      });
  };

    //console.log(form)

    return (
        <div className="p-4 bg-base-200 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold flex gap-2">
                    <PlusIconCustom size={32}/>
                    Edit Game
                </h1>
            </div>
            {/* - - - */}
            {showToast && (
                <div className="toast toast-top toast-end">
                    <div className="alert alert-success">
                        <span>Game: <strong>{form.title}</strong> updated successfully</span>
                    </div>
                </div>
            )}
      <form
        onSubmit={handleSubmit}
        className="max-w-90 mx-auto space-y-4"
      >
        <fieldset disabled={showToast || isPending} className="contents">
          <input type="hidden" name="id"             value={game.id} />
          <input type="hidden" name="existing_cover" value={game.cover} />
          {/* Cover - - - */}
          <div className="flex flex-col items-center">
            <div
              onClick={handleImageClick}
              className="cursor-pointer w-48 h-48 flex flex-col items-center justify-center hover:opacity-80 hover:scale-110 transition"
            >
              <div className="avatar">
                  <div className="mask mask-squircle w-full">
                      <img
                          src={preview}
                          alt="Preview"
                          className="object-cover w-full h-full"
                      />
                  </div>
              </div>
              <span className="text-sm text-gray-500 text-center px-2">
                  Click to upload cover
              </span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              name="cover"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {errors.cover && (
              <small className="text-error mt-2">{errors.cover[0]}</small>
            )}
          </div>

          {/* Title - - - */}
          <div>
            <label className="label">Title</label>
            <input name="title" className="input input-bordered w-full" value={form.title} onChange={handleChange} />
            {errors.title && <small className="text-error">{errors.title[0]}</small>}
          </div>

          {/* Developer - - - */}
          <div>
            <label className="label">Developer</label>
            <input name="developer" className="input input-bordered w-full" value={form.developer} onChange={handleChange} />
            {errors.developer && <small className="text-error">{errors.developer[0]}</small>}
          </div>

          {/* Date - - - */}
          <div>
            <label className="label">Release Date</label>
            <input type="date" name="releasedate" className="input input-bordered w-full" value={form.releasedate} onChange={handleChange} />
            {errors.releasedate && <small className="text-error">{errors.releasedate[0]}</small>}
          </div>

          {/* Price - - - */}
          <div>
            <label className="label">Price</label>
            <input type="number" step="0.01" name="price" className="input input-bordered w-full" value={form.price} onChange={handleChange} />
            {errors.price && <small className="text-error">{errors.price[0]}</small>}
          </div>

          {/* Genre - - - */}
          <div>
            <label className="label">Genre</label>
            <input name="genre" className="input input-bordered w-full" value={form.genre} onChange={handleChange} />
            {errors.genre && <small className="text-error">{errors.genre[0]}</small>}
          </div>

          {/* Description - - - */}
          <div>
            <label className="label">Description</label>
            <textarea name="description" className="textarea textarea-bordered w-full" value={form.description} onChange={handleChange} />
            {errors.description && <small className="text-error">{errors.description[0]}</small>}
          </div>

          {/* Console - - - */}
          <div>
            <label className="label">Console</label>
            <select name="console_id" 
                    className="select select-bordered w-full"
                    value={String(form.console_id)}
                    onChange={handleChange}
            >
              <option value="" disabled>Select a console</option>
              {consoles.map((console: any) => (
                <option key={console.id} value={String(console.id)}>
                  {console.name}
                </option>
              ))}
            </select>
            {errors.console_id && <small className="text-error">{errors.console_id[0]}</small>}
          </div>
            {/* Button - - - */}
            <button
              type="submit"
              className="btn bg-purple-600 w-full mt-4 hover:bg-purple-800"
              disabled={isPending || showToast}
            >
              {(isPending || showToast) && (
                <span className="loading loading-spinner loading-sm"></span>
              )}
              {isPending ? "Saving..." : showToast ? "Redirecting..." : "Edit Game"}
            </button>
          </fieldset>
      </form>
    </div>
  );
}