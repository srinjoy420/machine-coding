import Todo from "../model/Notes.model.js";

// ─── Create Note ─────────────────────────────────────────────────────────────
export const Createnotes = async (req, res) => {
    const { title, description } = req.body;
    // FIX: use let so we can reassign the default
    let { status } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // FIX: assign default after the undefined check
    if (!status) {
        status = "InProgress";
    }

    try {
        // FIX: normalise title consistently for both the check and the save
        const normalisedTitle = title.toLowerCase().trim();

        const existingNote = await Todo.findOne({ title: normalisedTitle });
        if (existingNote) {
            return res.status(400).json({ message: "A note with this title already exists" });
        }

        // FIX: save normalised title and include status
        const note = await Todo.create({
            title: normalisedTitle,
            description,
            status,
        });

        res.status(201).json({ message: "Note created successfully", note });
    } catch (error) {
        console.error("Error creating note:", error);
        // Handle MongoDB duplicate key error (race condition safety net)
        if (error.code === 11000) {
            return res.status(400).json({ message: "A note with this title already exists" });
        }
        res.status(500).json({ message: "Failed to create note" });
    }
};

// ─── Get All Notes ────────────────────────────────────────────────────────────
export const GetallNotes = async (req, res) => {
    try {
        const notes = await Todo.find();

        if (!notes || notes.length === 0) {
            return res.status(404).json({ message: "No notes found" });
        }

        res.status(200).json({ message: "Notes fetched successfully", notes });
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Failed to fetch notes" });
    }
};

// ─── Search Notes by Status ───────────────────────────────────────────────────
export const searchByStatus = async (req, res) => {
    const { status } = req.query;

    // FIX: res.status() needs a number, and .json() must be chained
    if (!status) {
        return res.status(400).json({ message: "status query parameter is required" });
    }

    try {
        // FIX: renamed result variable to avoid shadowing the `status` from req.query
        const notes = await Todo.find({ status });

        if (!notes || notes.length === 0) {
            return res.status(404).json({ message: "No notes found with that status" });
        }

        res.status(200).json({ message: "Notes fetched successfully", notes });
    } catch (error) {
        // FIX: was returning 200 on error
        console.error("Error searching notes by status:", error);
        res.status(500).json({ message: "Failed to search notes" });
    }
};

// ─── Update Note ──────────────────────────────────────────────────────────────
export const UpdateNotes = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // FIX: correct casing — findByIdAndUpdate (capital A)
        // FIX: { new: true } returns the updated document instead of the old one
        const updatedNote = await Todo.findByIdAndUpdate(
            id,
            { title, description },
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({ message: "Note updated successfully", updatedNote });
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ message: "Failed to update note" });
    }
};

// ─── Delete Note ──────────────────────────────────────────────────────────────
export const deleteNotes = async (req, res) => {
    const { id } = req.params;

    try {
        // FIX: findById instead of findOne({ id }) — "id" is not a document field
        const note = await Todo.findById(id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        // FIX: deleteOne() on an instance takes no arguments
        await note.deleteOne();

        // FIX: send a response so the request doesn't hang
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        // FIX: was an empty catch block — errors were silently swallowed
        console.error("Error deleting note:", error);
        res.status(500).json({ message: "Failed to delete note" });
    }
};